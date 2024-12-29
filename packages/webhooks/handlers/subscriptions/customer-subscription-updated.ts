import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { subscriptions } from '@burse/database/schema/wh/subscriptions'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleCustomerSubscriptionUpdated = async (
  event: Stripe.Event
) => {
  const subscription = event.data.object as Stripe.Subscription

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Update the subscription record
  await db
    .update(subscriptions)
    .set({
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      quantity: subscription.items.data[0].quantity ?? 1,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      cancelAt: subscription.cancel_at
        ? new Date(subscription.cancel_at * 1000)
        : undefined,
      canceledAt: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : undefined,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      endedAt: subscription.ended_at
        ? new Date(subscription.ended_at * 1000)
        : undefined,
      trialStart: subscription.trial_start
        ? new Date(subscription.trial_start * 1000)
        : undefined,
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : undefined,
      metadata: subscription.metadata ?? {},
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeId, subscription.id))
}
