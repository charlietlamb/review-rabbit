import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { charges } from '@burse/database/schema/wh/charges'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleChargeCaptured = async (event: Stripe.Event) => {
  const charge = event.data.object as Stripe.Charge

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  await db
    .update(charges)
    .set({
      status: charge.status,
      paymentMethod: charge.payment_method_details?.type ?? 'unknown',
      description: charge.description ?? undefined,
      failureCode: charge.failure_code ?? undefined,
      failureMessage: charge.failure_message ?? undefined,
      disputed: charge.disputed,
      refunded: charge.refunded,
      metadata: charge.metadata,
    })
    .where(eq(charges.stripeId, charge.id))
}
