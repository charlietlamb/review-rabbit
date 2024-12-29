import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { subscriptions } from '@burse/database/schema/wh/subscriptions'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleCustomerSubscriptionDeleted = async (
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

  // Update the subscription record to mark it as deleted
  await db
    .update(subscriptions)
    .set({
      status: subscription.status,
      canceledAt: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : undefined,
      endedAt: subscription.ended_at
        ? new Date(subscription.ended_at * 1000)
        : undefined,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeId, subscription.id))
}
