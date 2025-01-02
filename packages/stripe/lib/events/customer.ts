import { db } from '@rabbit/database'
import { customers } from '@rabbit/database/schema/stripe/customers'
import { Stripe } from 'stripe'
import { eq } from 'drizzle-orm'

export async function handleCustomerCreated(event: Stripe.Event) {
  const { data } = event as Stripe.CustomerCreatedEvent
  await db.insert(customers).values({
    id: data.object.id,
    userId: data.object.metadata.userId,
  })
}

export async function handleCustomerDeleted(event: Stripe.Event) {
  const { data } = event as Stripe.CustomerDeletedEvent
  await db.delete(customers).where(eq(customers.id, data.object.id))
}

export async function handleCustomerUpdated(event: Stripe.Event) {
  const { data } = event as Stripe.CustomerUpdatedEvent
  await db
    .update(customers)
    .set({
      id: data.object.id,
    })
    .where(eq(customers.id, data.object.id))
}
