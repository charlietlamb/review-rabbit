import Stripe from 'stripe'
import { env } from '@remio/env'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  typescript: true,
})
