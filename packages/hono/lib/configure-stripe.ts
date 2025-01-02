import Stripe from 'stripe'
import { getEnv } from '@rabbit/env'
import { handleStripeEvent } from '@rabbit/stripe'
import { AppOpenAPI } from './types'

export default async function configureStripe(app: AppOpenAPI) {
  app.post('/webhook', async (context) => {
    const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = getEnv()
    const stripe = new Stripe(STRIPE_SECRET_KEY)
    const signature = context.req.header('stripe-signature')
    try {
      if (!signature) {
        return context.text('', 400)
      }
      const body = await context.req.text()
      const event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET
      )

      handleStripeEvent(event)
      return context.text('', 200)
    } catch (err) {
      const errorMessage = `⚠️  Webhook signature verification failed. ${
        err instanceof Error ? err.message : 'Internal server error'
      }`
      console.log(errorMessage)
      return context.text(errorMessage, 400)
    }
  })
}
