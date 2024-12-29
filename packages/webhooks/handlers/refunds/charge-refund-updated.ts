import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { refunds } from '@burse/database/schema/wh/refunds'
import { charges } from '@burse/database/schema/wh/charges'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleChargeRefundUpdated = async (event: Stripe.Event) => {
  const refund = event.data.object as Stripe.Refund

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Get the charge ID from the charges table
  const charge = await db.query.charges.findFirst({
    where: eq(charges.stripeId, refund.charge as string),
  })

  if (!charge) {
    throw new Error(`No charge found for ID: ${refund.charge}`)
  }

  // Update the refund status
  await db
    .update(refunds)
    .set({
      status: refund.status ?? undefined,
      failureReason: refund.failure_reason ?? undefined,
      metadata: refund.metadata,
    })
    .where(eq(refunds.stripeId, refund.id))

  // Update the charge's refunded status if needed
  if (refund.status === 'succeeded') {
    await db
      .update(charges)
      .set({
        refunded: true,
      })
      .where(eq(charges.id, charge.id))
  }
}
