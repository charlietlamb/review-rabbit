import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { checkoutSessions } from '@burse/database/schema/wh/checkout-sessions'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  const session = event.data.object as Stripe.Checkout.Session

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Create or update the checkout session
  const existingSession = await db.query.checkoutSessions.findFirst({
    where: eq(checkoutSessions.stripeId, session.id),
  })

  if (existingSession) {
    // Update existing session
    await db
      .update(checkoutSessions)
      .set({
        status: session.status ?? 'complete',
        paymentStatus: session.payment_status ?? 'paid',
        amountTotal: session.amount_total?.toString(),
        amountSubtotal: session.amount_subtotal?.toString(),
        paymentIntentId: session.payment_intent?.toString(),
        customerId: session.customer?.toString(),
        metadata: session.metadata ?? {},
        updatedAt: new Date(),
      })
      .where(eq(checkoutSessions.stripeId, session.id))
  } else {
    // Create new session
    await db.insert(checkoutSessions).values({
      id: uuidv4(),
      userId: stripeConnect.userId,
      stripeId: session.id,
      status: session.status ?? 'complete',
      mode: session.mode ?? 'payment',
      currency: session.currency ?? 'usd',
      amountTotal: session.amount_total?.toString(),
      amountSubtotal: session.amount_subtotal?.toString(),
      paymentStatus: session.payment_status ?? 'paid',
      paymentIntentId: session.payment_intent?.toString(),
      customerId: session.customer?.toString(),
      url: session.url ?? undefined,
      expiresAt: session.expires_at
        ? new Date(session.expires_at * 1000)
        : undefined,
      metadata: session.metadata ?? {},
    })
  }
}
