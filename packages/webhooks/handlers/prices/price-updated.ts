import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { stripePrices } from '@burse/database/schema/stripe/stripe-prices'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handlePriceUpdated = async (event: Stripe.Event) => {
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

    // Get the existing price
    const existingPrice = await db.query.stripePrices.findFirst({
      where: eq(stripePrices.stripePriceId, price.id),
    })

    if (!existingPrice) {
      throw new Error(`No price found with ID: ${price.id}`)
    }

    // Update the price record
    await db
      .update(stripePrices)
      .set({
        title:
          price.nickname ??
          `${price.currency.toUpperCase()} ${price.unit_amount ? price.unit_amount / 100 : 0}`,
        amount: price.unit_amount ?? 0,
        currency: price.currency,
        updatedAt: new Date(),
      })
      .where(eq(stripePrices.stripePriceId, price.id))
  } catch (error) {
    console.error('Error handling price.updated event:', error)
    throw error
  }
}
