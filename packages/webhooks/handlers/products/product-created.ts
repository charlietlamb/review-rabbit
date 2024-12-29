import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { stripeProducts } from '@burse/database/schema/stripe/stripe-products'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handleProductCreated = async (event: Stripe.Event) => {
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

    // Check if product already exists
    const existingProduct = await db.query.stripeProducts.findFirst({
      where: eq(stripeProducts.stripeProductId, product.id),
    })

    if (existingProduct) {
      throw new Error(`Product already exists with ID: ${product.id}`)
    }

    // Create the product record
    await db.insert(stripeProducts).values({
      id: uuidv4(),
      userId: stripeConnect.userId,
      stripeConnectId: stripeConnect.id,
      title: product.name,
      stripeProductId: product.id,
      stripeTestProductId: product.id, // Same ID for now, will be different in test mode
      taxCode: typeof product.tax_code === 'string' ? product.tax_code : null,
    })
  } catch (error) {
    console.error('Error handling product.created event:', error)
    throw error
  }
}
