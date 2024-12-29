import Stripe from 'stripe'
import { getEnv } from '@burse/env'

export const stripe = new Stripe(getEnv().STRIPE_SECRET_KEY, {
  typescript: true,
})
