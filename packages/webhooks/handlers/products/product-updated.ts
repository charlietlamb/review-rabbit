import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { stripeProducts } from '@burse/database/schema/stripe/stripe-products'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleProductUpdated = async (event: Stripe.Event) => {
  try {
    const product = event.data.object as Stripe.Product

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Get the existing product
    const existingProduct = await db.query.stripeProducts.findFirst({
      where: eq(stripeProducts.stripeProductId, product.id),
    })

    if (!existingProduct) {
      throw new Error(`No product found with ID: ${product.id}`)
    }

    // Update the product record
    await db
      .update(stripeProducts)
      .set({
        title: product.name,
        taxCode: typeof product.tax_code === 'string' ? product.tax_code : null,
        updatedAt: new Date(),
      })
      .where(eq(stripeProducts.stripeProductId, product.id))
  } catch (error) {
    console.error('Error handling product.updated event:', error)
    throw error
  }
}
