'use server'

import { Plan } from '@remio/hono/lib/types'
import { postStripeSession } from './stripe-session'

export const checkout = async (priceId: string, plan: Plan) => {
  return await postStripeSession({ priceId, plan })
}
