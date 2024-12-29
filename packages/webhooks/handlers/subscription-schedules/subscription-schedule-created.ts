import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { subscriptionSchedules } from '@burse/database/schema/wh/subscription-schedules'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleSubscriptionScheduleCreated = async (
  event: Stripe.Event
) => {
  try {
    const schedule = event.data.object as Stripe.SubscriptionSchedule

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Check if subscription schedule already exists
    const existingSchedule = await db.query.subscriptionSchedules.findFirst({
      where: eq(subscriptionSchedules.stripeId, schedule.id),
    })

    if (existingSchedule) {
      throw new Error(
        `Subscription Schedule already exists with ID: ${schedule.id}`
      )
    }

    // Create the subscription schedule record
    await db.insert(subscriptionSchedules).values({
      id: schedule.id,
      userId: stripeConnect.userId,
      stripeId: schedule.id,
      customerId: schedule.customer as string,
      subscriptionId:
        typeof schedule.subscription === 'string'
          ? schedule.subscription
          : schedule.subscription?.id,
      status: schedule.status,
      phases: schedule.phases,
      currentPhase: schedule.current_phase,
      defaultSettings: schedule.default_settings,
      endBehavior: schedule.end_behavior,
      metadata: schedule.metadata,
      releasedSubscription: schedule.released_subscription,
      releasedAt: schedule.released_at
        ? new Date(schedule.released_at * 1000)
        : null,
    })
  } catch (error) {
    console.error('Error handling subscription.schedule.created event:', error)
    throw error
  }
}
