import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { paymentIntents } from '@burse/database/schema/wh/payment-intents'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { customers } from '@burse/database/schema/wh/customers'
import { eq } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handlePaymentIntentCreated = async (event: Stripe.Event) => {
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

    // Get the customer record
    const customer = await db.query.customers.findFirst({
      where: eq(customers.stripeId, paymentIntent.customer as string),
    })

    if (!customer) {
      throw new Error(`No customer found for ID: ${paymentIntent.customer}`)
    }

    // Check if payment intent already exists
    const existingPaymentIntent = await db.query.paymentIntents.findFirst({
      where: eq(paymentIntents.stripeId, paymentIntent.id),
    })

    if (existingPaymentIntent) {
      throw new Error(
        `Payment Intent already exists with ID: ${paymentIntent.id}`
      )
    }

    // Create the payment intent record
    await db.insert(paymentIntents).values({
      id: uuidv4(),
      userId: stripeConnect.userId,
      stripeId: paymentIntent.id,
      customerId: customer.id,
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
    })
  } catch (error) {
    console.error('Error handling payment_intent.created event:', error)
    throw error
  }
}
