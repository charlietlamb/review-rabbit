import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { chargeDisputes } from '@burse/database/schema/wh/charge-disputes'
import { charges } from '@burse/database/schema/wh/charges'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleChargeDisputeClosed = async (event: Stripe.Event) => {
  const dispute = event.data.object as Stripe.Dispute

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Get the charge ID from the charges table
  const charge = await db.query.charges.findFirst({
    where: eq(charges.stripeId, dispute.charge as string),
  })

  if (!charge) {
    throw new Error(`No charge found for ID: ${dispute.charge}`)
  }

  // Update the dispute status
  await db
    .update(chargeDisputes)
    .set({
      status: dispute.status,
      reason: dispute.reason ?? undefined,
      evidenceDueBy: dispute.evidence_details?.due_by
        ? new Date(dispute.evidence_details.due_by * 1000)
        : undefined,
      isRefunded: dispute.is_charge_refundable,
      metadata: dispute.metadata,
    })
    .where(eq(chargeDisputes.stripeId, dispute.id))

  // Update the charge's disputed status based on the dispute status
  await db
    .update(charges)
    .set({
      disputed: dispute.status !== 'won',
    })
    .where(eq(charges.id, charge.id))
}
