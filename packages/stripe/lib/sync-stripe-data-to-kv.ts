'use server'

import { Redis } from '@upstash/redis'
import Stripe from 'stripe'

export async function syncStripeDataToKV(
  customerId: string,
  kv: Redis,
  stripe: Stripe
) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
    status: 'all',
    expand: ['data.default_payment_method'],
  })

  if (subscriptions.data.length === 0) {
    const subData = { status: 'none' }
    await kv.set(`stripe:customer:${customerId}`, subData)
    return subData
  }

  const subscription = subscriptions.data[0]

  const subData = {
    subscriptionId: subscription.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    currentPeriodEnd: subscription.current_period_end,
    currentPeriodStart: subscription.current_period_start,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    currency: subscription.currency,
    paymentMethod:
      subscription.default_payment_method &&
      typeof subscription.default_payment_method !== 'string'
        ? {
            brand: subscription.default_payment_method.card?.brand ?? null,
            last4: subscription.default_payment_method.card?.last4 ?? null,
          }
        : null,
  }

  await kv.set(`stripe:customer:${customerId}`, subData)
  return subData
}
