import { db } from '@rabbit/database'
import { payments } from '@rabbit/database/schema/stripe/payments'
import { Stripe } from 'stripe'
import { eq } from 'drizzle-orm'

export async function handlePaymentIntentCancelled(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  await db
    .update(payments)
    .set({
      status: 'cancelled',
    })
    .where(eq(payments.id, paymentIntent.id))
}

export async function handlePaymentIntentCreated(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  try {
    await db.insert(payments).values({
      id: paymentIntent.id,
      createdAt: new Date(),
      currency: paymentIntent.currency,
      customerId: paymentIntent.customer as string,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      amountReceived: paymentIntent.amount_received,
      paymentMethod: paymentIntent.payment_method as string,
    })
  } catch (error) {
    console.error(error)
  }
}

export async function handlePaymentIntentPartiallyFunded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  await db
    .update(payments)
    .set({
      status: 'partially_funded',
      amount: paymentIntent.amount,
      amountReceived: paymentIntent.amount_received,
    })
    .where(eq(payments.id, paymentIntent.id))
}

export async function handlePaymentIntentPaymentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  await db
    .update(payments)
    .set({
      status: 'failed',
      lastError: paymentIntent.last_payment_error?.message,
      paymentMethod: paymentIntent.payment_method as string,
    })
    .where(eq(payments.id, paymentIntent.id))
}

export async function handlePaymentIntentProcessing(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  await db
    .update(payments)
    .set({
      status: 'processing',
      amountReceived: paymentIntent.amount_received,
      paymentMethod: paymentIntent.payment_method as string,
    })
    .where(eq(payments.id, paymentIntent.id))
}

export async function handlePaymentIntentRequiresAction(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  await db
    .update(payments)
    .set({
      status: 'requires_action',
      nextAction: paymentIntent.next_action?.type,
      paymentMethod: paymentIntent.payment_method as string,
    })
    .where(eq(payments.id, paymentIntent.id))
}

export async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  await db
    .update(payments)
    .set({
      status: 'succeeded',
      amountReceived: paymentIntent.amount_received,
      paymentMethod: paymentIntent.payment_method as string,
    })
    .where(eq(payments.id, paymentIntent.id))
}
