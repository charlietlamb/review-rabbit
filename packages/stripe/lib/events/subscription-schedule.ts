import { db } from '@rabbit/database'
import { subscriptionSchedules } from '@rabbit/database/schema/stripe/subscription-schedules'
import { Stripe } from 'stripe'
import { eq } from 'drizzle-orm'

export async function handleSubscriptionScheduleAborted(event: Stripe.Event) {
  const schedule = event.data.object as Stripe.SubscriptionSchedule
  await db
    .update(subscriptionSchedules)
    .set({
      status: schedule.status,
    })
    .where(eq(subscriptionSchedules.id, schedule.id))
}

export async function handleSubscriptionScheduleCanceled(event: Stripe.Event) {
  const schedule = event.data.object as Stripe.SubscriptionSchedule
  await db
    .update(subscriptionSchedules)
    .set({
      status: schedule.status,
    })
    .where(eq(subscriptionSchedules.id, schedule.id))
}

export async function handleSubscriptionScheduleCompleted(event: Stripe.Event) {
  const schedule = event.data.object as Stripe.SubscriptionSchedule
  await db
    .update(subscriptionSchedules)
    .set({
      status: schedule.status,
    })
    .where(eq(subscriptionSchedules.id, schedule.id))
}

export async function handleSubscriptionScheduleCreated(event: Stripe.Event) {
  const schedule = event.data.object as Stripe.SubscriptionSchedule
  await db.insert(subscriptionSchedules).values({
    id: schedule.id,
    subscriptionId: schedule.subscription as string,
    status: schedule.status,
  })
}

export async function handleSubscriptionScheduleExpiring(event: Stripe.Event) {
  const schedule = event.data.object as Stripe.SubscriptionSchedule
  await db
    .update(subscriptionSchedules)
    .set({
      status: schedule.status,
    })
    .where(eq(subscriptionSchedules.id, schedule.id))
}

export async function handleSubscriptionScheduleReleased(event: Stripe.Event) {
  const schedule = event.data.object as Stripe.SubscriptionSchedule
  await db
    .update(subscriptionSchedules)
    .set({
      status: schedule.status,
    })
    .where(eq(subscriptionSchedules.id, schedule.id))
}

export async function handleSubscriptionScheduleUpdated(event: Stripe.Event) {
  const schedule = event.data.object as Stripe.SubscriptionSchedule
  await db
    .update(subscriptionSchedules)
    .set({
      status: schedule.status,
      subscriptionId: schedule.subscription as string,
    })
    .where(eq(subscriptionSchedules.id, schedule.id))
}
