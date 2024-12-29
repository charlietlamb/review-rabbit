import Stripe from 'stripe'
import { Hono } from 'hono'
import { handleStripeWebhook } from './handlers/stripe-webhooks'
import { HttpStatusCodes } from '@burse/http'
import { Env, setupEnv } from './setup-env'
import { getEnv } from '@burse/env'

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  setupEnv(c.env)
  return c.text(`${HttpStatusCodes.OK} ${JSON.stringify(c.env)}`)
})

app.get('/env', (c) => {
  setupEnv(c.env)
  return c.text(`${HttpStatusCodes.OK} ${JSON.stringify(getEnv())}`)
})

app.post('/', async (context) => {
  setupEnv(context.env)

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
    return context.text(errorMessage, 400)
  }
})

export default app
