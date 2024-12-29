import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { transfers } from '@burse/database/schema/wh/transfers'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleTransferUpdated = async (event: Stripe.Event) => {
  try {
    const transfer = event.data.object as Stripe.Transfer

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Get the existing transfer
    const existingTransfer = await db.query.transfers.findFirst({
      where: eq(transfers.stripeId, transfer.id),
    })

    if (!existingTransfer) {
      throw new Error(`No Transfer found with ID: ${transfer.id}`)
    }

    // Update the transfer record
    await db
      .update(transfers)
      .set({
        amount: transfer.amount.toString(),
        description: transfer.description,
        destinationPayment:
          typeof transfer.destination_payment === 'string'
            ? transfer.destination_payment
            : transfer.destination_payment?.id,
        reversals: transfer.reversals.data,
        balanceTransaction: transfer.balance_transaction,
        metadata: transfer.metadata,
        updatedAt: new Date(),
      })
      .where(eq(transfers.stripeId, transfer.id))
  } catch (error) {
    console.error('Error handling transfer.updated event:', error)
    throw error
  }
}
