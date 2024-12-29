import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { payouts } from '@burse/database/schema/wh/payouts'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handlePayoutPaid = async (event: Stripe.Event) => {
  try {
    const payout = event.data.object as Stripe.Payout

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Get the existing payout
    const existingPayout = await db.query.payouts.findFirst({
      where: eq(payouts.stripeId, payout.id),
    })

    if (!existingPayout) {
      throw new Error(`No payout found with ID: ${payout.id}`)
    }

    // Update the payout record
    await db
      .update(payouts)
      .set({
        status: payout.status,
        paidAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(payouts.stripeId, payout.id))
  } catch (error) {
    console.error('Error handling payout.paid event:', error)
    throw error
  }
}
