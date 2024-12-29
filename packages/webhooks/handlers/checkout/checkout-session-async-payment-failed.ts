import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { checkoutSessions } from '@burse/database/schema/wh/checkout-sessions'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleCheckoutSessionAsyncPaymentFailed = async (
  event: Stripe.Event
) => {
  const session = event.data.object as Stripe.Checkout.Session

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Update the checkout session status
  await db
    .update(checkoutSessions)
    .set({
      status: session.status ?? 'failed',
      paymentStatus: session.payment_status ?? 'failed',
      updatedAt: new Date(),
    })
    .where(eq(checkoutSessions.stripeId, session.id))
}
