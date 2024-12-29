import { db } from '@burse/database/postgres'
import { events } from '@burse/database/schema/wh/events'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'
import type Stripe from 'stripe'

export async function saveStripeEvent(event: Stripe.Event) {
  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Save the event to the events table
  await db.insert(events).values({
    id: uuidv4(),
    userId: stripeConnect.userId,
    type: event.type,
    data: event.data.object,
    stripeAccountId: event.account!,
    stripeEventId: event.id,
    createdAt: new Date(event.created * 1000),
    processedAt: new Date(),
  })
}
