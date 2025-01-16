'use server'

import { Plan } from '@rabbit/hono/lib/types'
import { postStripeSession } from './stripe-session'
import { User } from '@rabbit/database'

export const checkout = async (user: User, priceId: string, plan: Plan) => {
  return await postStripeSession({ user, priceId, plan })
}
