import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { subscriptionSchedules } from '@burse/database/schema/wh/subscription-schedules'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleSubscriptionScheduleCompleted = async (
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

    // Get the existing subscription schedule
    const existingSchedule = await db.query.subscriptionSchedules.findFirst({
      where: eq(subscriptionSchedules.stripeId, schedule.id),
    })

    if (!existingSchedule) {
      throw new Error(`No Subscription Schedule found with ID: ${schedule.id}`)
    }

    // Update the subscription schedule record
    await db
      .update(subscriptionSchedules)
      .set({
        status: schedule.status,
        updatedAt: new Date(),
      })
      .where(eq(subscriptionSchedules.stripeId, schedule.id))
  } catch (error) {
    console.error(
      'Error handling subscription.schedule.completed event:',
      error
    )
    throw error
  }
}
