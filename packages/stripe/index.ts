import Stripe from 'stripe'
import { env } from '@burse/env'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  typescript: true,
})
