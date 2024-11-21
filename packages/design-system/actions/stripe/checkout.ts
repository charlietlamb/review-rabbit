'use server'

import { postStripeSession } from './stripe-session'

export const checkout = async (priceId: string, plan: Plan) => {
  return await postStripeSession({ priceId, plan })
}
