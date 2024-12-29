import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { refunds } from '@burse/database/schema/wh/refunds'
import { charges } from '@burse/database/schema/wh/charges'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handleChargeRefundCreated = async (event: Stripe.Event) => {
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

  // Create the refund record
  const refundData: {
    id: string
    userId: string
    stripeId: string
    chargeId: string
    amount: string
    currency: string
    status: string
    reason?: string
    receiptNumber?: string
    failureReason?: string
    metadata?: Record<string, string>
  } = {
    id: uuidv4(),
    userId: stripeConnect.userId,
    stripeId: refund.id,
    chargeId: charge.id,
    amount: refund.amount.toString(),
    currency: refund.currency,
    status: refund.status || 'unknown',
  }

  if (refund.reason) {
    refundData.reason = refund.reason
  }

  if (refund.receipt_number) {
    refundData.receiptNumber = refund.receipt_number
  }

  if (refund.failure_reason) {
    refundData.failureReason = refund.failure_reason
  }

  if (refund.metadata) {
    refundData.metadata = refund.metadata
  }

  await db.insert(refunds).values(refundData)

  // Update the charge's refunded status
  await db
    .update(charges)
    .set({
      refunded: true,
    })
    .where(eq(charges.id, charge.id))
}
