'use server'

import { Plan } from '@rabbit/hono/lib/types'
import { postStripeSession } from './stripe-session'

export const checkout = async (priceId: string, plan: Plan) => {
  return await postStripeSession({ priceId, plan })
}
