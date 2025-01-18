import { Subscription } from '@rabbit/stripe/lib/subscription'
import { StripeSubscription } from '@rabbit/stripe/lib/stripe-subscription'
import { kv } from '@rabbit/kv'
import { getEnv } from '@rabbit/env'

export async function getStripeDetails(
  userId: string
): Promise<Subscription | null> {
  const customerId: string | null = await kv.get(`stripe:user:${userId}`)
  if (!customerId) {
    return null
  }
  console.log('customerId', customerId)
  const stripeSubscription: StripeSubscription | null = await kv.get(
    `stripe:customer:${customerId}`
  )

  if (!stripeSubscription) {
    return null
  }
  console.log('stripeSubscription', stripeSubscription)
  const env = getEnv()
  const plusPriceIds = [
    env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID,
    env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_YEARLY,
  ]
  const proPriceIds = [
    env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO,
    env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO_YEARLY,
  ]
  const plan = plusPriceIds.includes(stripeSubscription.priceId)
    ? 'plus'
    : proPriceIds.includes(stripeSubscription.priceId)
      ? 'pro'
      : 'free'

  const monthlyPriceIds = [
    env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID,
    env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO,
  ]
  const interval = monthlyPriceIds.includes(stripeSubscription.priceId)
    ? 'month'
    : 'year'

  return {
    plan,
    status: stripeSubscription.status,
    subscriptionId: stripeSubscription.subscriptionId,
    priceId: stripeSubscription.priceId,
    interval,
    currentPeriodStart: stripeSubscription.currentPeriodStart,
    currentPeriodEnd: stripeSubscription.currentPeriodEnd,
    cancelAtPeriodEnd: stripeSubscription.cancelAtPeriodEnd,
    paymentMethod: stripeSubscription.paymentMethod,
  } as Subscription
}
