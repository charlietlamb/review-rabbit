import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { paymentIntents } from '@burse/database/schema/wh/payment-intents'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export const handlePaymentIntentUpdated = async (event: Stripe.Event) => {
  try {
    const paymentIntent = event.data.object as Stripe.PaymentIntent

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Get the existing payment intent
    const existingPaymentIntent = await db.query.paymentIntents.findFirst({
      where: eq(paymentIntents.stripeId, paymentIntent.id),
    })

    if (!existingPaymentIntent) {
      throw new Error(`No payment intent found with ID: ${paymentIntent.id}`)
    }

    // Update the payment intent record
    await db
      .update(paymentIntents)
      .set({
        amount: sql`${paymentIntent.amount / 100}::decimal`,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        paymentMethod: paymentIntent.payment_method as string | null,
        description: paymentIntent.description,
        confirmationMethod: paymentIntent.confirmation_method,
        requiresAction: paymentIntent.status === 'requires_action',
        requiresCapture: paymentIntent.status === 'requires_capture',
        setupFutureUsage: paymentIntent.setup_future_usage,
        metadata: paymentIntent.metadata ?? {},
        updatedAt: new Date(),
      })
      .where(eq(paymentIntents.stripeId, paymentIntent.id))
  } catch (error) {
    console.error('Error handling payment_intent.updated event:', error)
    throw error
  }
}
