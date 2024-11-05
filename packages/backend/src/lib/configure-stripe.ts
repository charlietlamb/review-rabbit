import Stripe from 'stripe'
import env from '../env'
import { AppOpenAPI, stripeMetaDataSchema } from './types'

export default async function configureStripe(app: AppOpenAPI) {
  app.post('/webhook', async (context) => {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY)
    const signature = context.req.header('stripe-signature')
    try {
      if (!signature) {
        return context.text('', 400)
      }
      const body = await context.req.text()
      const event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      )

      // @ts-ignore
      const metadata = event.data.object.metadata
      const { session, plan } = stripeMetaDataSchema.parse(metadata)
      switch (event.type) {
        case 'payment_intent.created': {
          break
        }
        default:
          break
      }
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
