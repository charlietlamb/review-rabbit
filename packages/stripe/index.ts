import Stripe from 'stripe'
import { getEnv } from '@burse/env'

export const stripe = new Stripe(getEnv().STRIPE_SECRET_KEY, {
  typescript: true,
})

export const stripeTest = new Stripe(getEnv().STRIPE_TEST_SECRET_KEY, {
  typescript: true,
})
