import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { stripePrices } from '@burse/database/schema/stripe/stripe-prices'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { stripeProducts } from '@burse/database/schema/stripe/stripe-products'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handlePriceCreated = async (event: Stripe.Event) => {
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

    // Get the product record
    const product = await db.query.stripeProducts.findFirst({
      where: eq(stripeProducts.stripeProductId, price.product as string),
    })

    if (!product) {
      throw new Error(`No product found for ID: ${price.product}`)
    }

    // Check if price already exists
    const existingPrice = await db.query.stripePrices.findFirst({
      where: eq(stripePrices.stripePriceId, price.id),
    })

    if (existingPrice) {
      throw new Error(`Price already exists with ID: ${price.id}`)
    }

    // Create the price record
    await db.insert(stripePrices).values({
      id: uuidv4(),
      stripeProductId: product.id,
      stripePriceId: price.id,
      title:
        price.nickname ??
        `${price.currency.toUpperCase()} ${price.unit_amount ? price.unit_amount / 100 : 0}`,
      amount: price.unit_amount ?? 0,
      currency: price.currency,
    })
  } catch (error) {
    console.error('Error handling price.created event:', error)
    throw error
  }
}
