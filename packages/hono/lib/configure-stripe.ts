import { AppOpenAPI } from './types'
import { handleStripeEvent } from '@rabbit/stripe'
import { getStripe } from '@rabbit/stripe'
import { getKv } from '@rabbit/kv'
import { Context } from 'hono'
import { AppBindings } from './types'

export default async function configureStripe(app: AppOpenAPI) {
  app.post('/webhook', async (context: Context<AppBindings>) => {
    const stripe = getStripe(context.env)
    const kv = getKv(context.env)
    const signature = context.req.header('stripe-signature')
    try {
      if (!signature) {
        return context.text('', 400)
      }
      const body = await context.req.text()
      const event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        context.env.STRIPE_WEBHOOK_SECRET
      )

      await handleStripeEvent(event, kv, stripe)
      return context.text('', 200)
    } catch (err) {
      const errorMessage = `⚠️  Webhook signature verification failed. ${
        err instanceof Error ? err.message : 'Internal server error'
      }`
      return context.text(errorMessage, 400)
    }
  })
}
