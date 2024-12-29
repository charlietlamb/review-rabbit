import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { stripePrices } from '@burse/database/schema/stripe/stripe-prices'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handlePriceDeleted = async (event: Stripe.Event) => {
  try {
    const price = event.data.object as Stripe.Price

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Delete the price record
    await db
      .delete(stripePrices)
      .where(eq(stripePrices.stripePriceId, price.id))
  } catch (error) {
    console.error('Error handling price.deleted event:', error)
    throw error
  }
}
