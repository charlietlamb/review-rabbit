import { db } from '@rabbit/database'
import { charges } from '@rabbit/database/schema/stripe/charges'
import { Stripe } from 'stripe'
import { eq } from 'drizzle-orm'

export async function handleChargeCaptured(event: Stripe.Event) {
  const { data } = event as Stripe.ChargeCapturedEvent
  await db.insert(charges).values({
    id: data.object.id,
    paymentId: data.object.payment_intent as string,
    amount: data.object.amount,
    currency: data.object.currency,
    status: data.object.status,
  })
}

export async function handleChargeExpired(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge
  await db
    .update(charges)
    .set({
      status: charge.status,
    })
    .where(eq(charges.id, charge.id))
}

export async function handleChargeFailed(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge
  await db
    .update(charges)
    .set({
      status: charge.status,
    })
    .where(eq(charges.id, charge.id))
}

export async function handleChargePending(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge
  await db.insert(charges).values({
    id: charge.id,
    paymentId: charge.payment_intent as string,
    amount: charge.amount,
    currency: charge.currency,
    status: charge.status,
  })
}

export async function handleChargeRefunded(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge
  await db
    .update(charges)
    .set({
      status: charge.status,
    })
    .where(eq(charges.id, charge.id))
}

export async function handleChargeSucceeded(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge
  await db
    .update(charges)
    .set({
      status: charge.status,
    })
    .where(eq(charges.id, charge.id))
}

export async function handleChargeUpdated(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge
  await db
    .update(charges)
    .set({
      status: charge.status,
      amount: charge.amount,
      currency: charge.currency,
    })
    .where(eq(charges.id, charge.id))
}
