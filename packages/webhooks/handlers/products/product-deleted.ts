import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { stripeProducts } from '@burse/database/schema/stripe/stripe-products'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleProductDeleted = async (event: Stripe.Event) => {
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

    // Delete the product record
    await db
      .delete(stripeProducts)
      .where(eq(stripeProducts.stripeProductId, product.id))
  } catch (error) {
    console.error('Error handling product.deleted event:', error)
    throw error
  }
}
