import Stripe from 'stripe'
import { Hono } from 'hono'
import { handleStripeWebhook } from './handlers/stripe-webhooks'
import { HttpStatusCodes } from '@burse/http'
import { Env, setupEnv } from './setup-env'
import { getEnv } from '@burse/env'

console.log('index.ts')
const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  setupEnv(c.env)
  console.log('--------------------------------')
  console.log(JSON.stringify(process.env.NODE_ENV))
  console.log('--------------------------------')
  return c.text(`${HttpStatusCodes.OK} ${JSON.stringify(getEnv())}`)
})

app.post('/', async (context) => {
  setupEnv(context.env)
  console.log('Webhook received')
  console.log(HttpStatusCodes.ACCEPTED)

  // Initialize process.env with Cloudflare environment variables

  const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = getEnv()
  const stripe = new Stripe(STRIPE_SECRET_KEY as string)
  const signature = context.req.header('stripe-signature')

  try {
    if (!signature) {
      return context.text('No signature found', 400)
    }

    const body = await context.req.text()
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET as string
    )

    const result = await handleStripeWebhook(event)

    if (!result.success) {
      return context.text(result.message || 'Webhook handling failed', 400)
    }

    return context.text('Webhook processed successfully', 200)
  } catch (err) {
    const errorMessage = `⚠️  Webhook signature verification failed. ${
      err instanceof Error ? err.message : 'Internal server error'
    }`
    console.error(errorMessage)
    return context.text(errorMessage, 400)
  }
})

export default app
