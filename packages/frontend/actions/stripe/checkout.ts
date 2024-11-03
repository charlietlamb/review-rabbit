'use server'

import { postStripeSession } from './stripe-session'

export const checkout = async (priceId: string) => {
  return await postStripeSession({ priceId })
}
