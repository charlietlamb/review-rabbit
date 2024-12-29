import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { paymentIntents } from '@burse/database/schema/wh/payment-intents'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handlePaymentIntentSucceeded = async (event: Stripe.Event) => {
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
        status: paymentIntent.status,
        paymentMethod: paymentIntent.payment_method as string | null,
        paidAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(paymentIntents.stripeId, paymentIntent.id))
  } catch (error) {
    console.error('Error handling payment_intent.succeeded event:', error)
    throw error
  }
}
