import Stripe from 'stripe'
import { getEnv } from '@rabbit/env'

export const stripe = new Stripe(getEnv().STRIPE_SECRET_KEY, {
  typescript: true,
})

export { handleStripeEvent } from './lib/handle-stripe-event'
export { syncStripeDataToKV } from './lib/sync-stripe-data-to-kv'
export type { StripeSubCache } from './lib/stripe-sub-cache'
