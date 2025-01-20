import Stripe from 'stripe'
import { EnvType } from '@rabbit/env'

let stripeInstance: Stripe | null = null

export function getStripe(env: EnvType) {
  if (!stripeInstance) {
    stripeInstance = new Stripe(env.STRIPE_SECRET_KEY, {
      typescript: true,
    })
  }
  return stripeInstance
}

export { handleStripeEvent } from './lib/handle-stripe-event'
export { syncStripeDataToKV } from './lib/sync-stripe-data-to-kv'
export type { StripeSubCache } from './lib/stripe-sub-cache'
