import { allowedEvents } from './allowed-events'
import { syncStripeDataToKV } from './sync-stripe-data-to-kv'
import Stripe from 'stripe'
import { Redis } from '@upstash/redis'

export async function handleStripeEvent(
  event: Stripe.Event,
  kv: Redis,
  stripe: Stripe
) {
  if (!allowedEvents.includes(event.type)) return

  const { customer: customerId } = event?.data?.object as {
    customer: string
  }

  if (typeof customerId !== 'string') {
    throw new Error(`[STRIPE HOOK] ID isn't string.\nEvent type: ${event.type}`)
  }

  return await syncStripeDataToKV(customerId, kv, stripe)
}
