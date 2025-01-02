import { db } from '@rabbit/database'
import { subscriptions } from '@rabbit/database/schema/stripe/subscriptions'
import { Stripe } from 'stripe'
import { eq } from 'drizzle-orm'

export async function handleSubscriptionCreated(event: Stripe.Event) {
  const { data } = event as Stripe.CustomerSubscriptionCreatedEvent
  await db.insert(subscriptions).values({
    id: data.object.id,
    customerId: data.object.customer as string,
    status: data.object.status,
  })
}

export async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  await db.delete(subscriptions).where(eq(subscriptions.id, subscription.id))
}

export async function handleSubscriptionPaused(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  await db
    .update(subscriptions)
    .set({
      status: subscription.status,
    })
    .where(eq(subscriptions.id, subscription.id))
}

export async function handleSubscriptionPendingUpdateApplied(
  event: Stripe.Event
) {
  const subscription = event.data.object as Stripe.Subscription
  await db
    .update(subscriptions)
    .set({
      status: subscription.status,
    })
    .where(eq(subscriptions.id, subscription.id))
}

export async function handleSubscriptionPendingUpdateExpired(
  event: Stripe.Event
) {
  const subscription = event.data.object as Stripe.Subscription
  await db
    .update(subscriptions)
    .set({
      status: subscription.status,
    })
    .where(eq(subscriptions.id, subscription.id))
}

export async function handleSubscriptionResumed(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  await db
    .update(subscriptions)
    .set({
      status: subscription.status,
    })
    .where(eq(subscriptions.id, subscription.id))
}

export async function handleSubscriptionTrialWillEnd(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  await db
    .update(subscriptions)
    .set({
      status: subscription.status,
    })
    .where(eq(subscriptions.id, subscription.id))
}

export async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  await db
    .update(subscriptions)
    .set({
      status: subscription.status,
      customerId: subscription.customer as string,
    })
    .where(eq(subscriptions.id, subscription.id))
}
