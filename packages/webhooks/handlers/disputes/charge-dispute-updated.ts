import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { chargeDisputes } from '@burse/database/schema/wh/charge-disputes'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleChargeDisputeUpdated = async (event: Stripe.Event) => {
  try {
    const dispute = event.data.object as Stripe.Dispute

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Get the existing dispute
    const existingDispute = await db.query.chargeDisputes.findFirst({
      where: eq(chargeDisputes.stripeId, dispute.id),
    })

    if (!existingDispute) {
      throw new Error(`No Dispute found with ID: ${dispute.id}`)
    }

    // Update the dispute record
    await db
      .update(chargeDisputes)
      .set({
        amount: dispute.amount.toString(),
        status: dispute.status,
        reason: dispute.reason,
        evidenceDueBy: dispute.evidence_details?.due_by
          ? new Date(dispute.evidence_details.due_by * 1000)
          : null,
        isRefunded: dispute.is_charge_refundable,
        metadata: dispute.metadata,
        updatedAt: new Date(),
      })
      .where(eq(chargeDisputes.stripeId, dispute.id))
  } catch (error) {
    console.error('Error handling charge.dispute.updated event:', error)
    throw error
  }
}
