import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { subscriptions } from '@burse/database/schema/wh/subscriptions'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleCustomerSubscriptionTrialWillEnd = async (
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

  // Update the subscription record with trial end information
  await db
    .update(subscriptions)
    .set({
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : undefined,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeId, subscription.id))
}
