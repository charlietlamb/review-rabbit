import Stripe from 'stripe'
import { getEnv } from '@rabbit/env'

export const stripe = new Stripe(getEnv().STRIPE_SECRET_KEY, {
  typescript: true,
})

export { handleStripeEvent } from './lib/handle-stripe-event'
