import { AppRouteHandler } from '@burse/hono/lib/types'
import { HttpStatusCodes } from '@burse/http'
import { stripeProducts } from '@burse/database/schema/stripe-products'
import { stripePrices } from '@burse/database/schema/stripe-prices'
import { stripeConnects } from '@burse/database/schema/stripe-connects'
import { db } from '@burse/database'
import { eq } from 'drizzle-orm'
import type {
  CreateStripeProductRoute,
  GetStripeProductsRoute,
} from './stripe-products.routes'
import { v4 as uuidv4 } from 'uuid'
import { stripe } from '@burse/stripe'

export const getStripeProducts: AppRouteHandler<
  GetStripeProductsRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { offset, limit } = await c.req.valid('json')

  try {
    const stripeProductsList = await db.query.stripeProducts.findMany({
      where: eq(stripeProducts.userId, user.id),
      offset,
      limit,
      with: {
        stripeConnect: true,
        prices: true,
      },
    })

    return c.json({ stripeProducts: stripeProductsList }, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error getting stripe products:', error)
    return c.json(
      { error: 'Failed to get stripe products' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const createStripeProduct: AppRouteHandler<
  CreateStripeProductRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const product = await c.req.valid('json')

  try {
    // Get the Stripe account ID from the stripe connect record
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, product.stripeConnectId),
    })

    if (!stripeConnect) {
      return c.json(
        { error: 'Stripe Connect account not found' },
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    }

    const stripeUserId = stripeConnect.stripeUserId
    if (!stripeUserId) {
      return c.json(
        { error: 'Stripe account not properly configured' },
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    }

    // After the null check, we can safely assert this is a string
    const stripeAccountId = stripeUserId as string

    // Create product in live mode
    const liveProduct = await stripe.products.create(
      {
        name: product.title,
        metadata: {
          userId: user.id,
        },
      },
      {
        stripeAccount: stripeAccountId,
      }
    )

    // Create product in test mode
    const testProduct = await stripe.products.create(
      {
        name: product.title,
        metadata: {
          userId: user.id,
        },
      },
      {
        stripeAccount: stripeAccountId,
      }
    )

    const productId = uuidv4()

    // Use a transaction for database operations
    await db.transaction(async (tx) => {
      // Store in database
      await tx.insert(stripeProducts).values({
        id: productId,
        userId: user.id,
        stripeConnectId: product.stripeConnectId,
        title: product.title,
        stripeProductId: liveProduct.id,
        stripeTestProductId: testProduct.id,
      })

      // Create prices for the product
      for (const price of product.prices) {
        const livePrice = await stripe.prices.create(
          {
            product: liveProduct.id,
            currency: price.currency.toLowerCase(),
            unit_amount: Math.round(price.price * 100), // Convert to cents
            nickname: price.title,
          },
          {
            stripeAccount: stripeAccountId,
          }
        )

        const testPrice = await stripe.prices.create(
          {
            product: testProduct.id,
            currency: price.currency.toLowerCase(),
            unit_amount: Math.round(price.price * 100), // Convert to cents
            nickname: price.title,
          },
          {
            stripeAccount: stripeAccountId,
          }
        )

        await tx.insert(stripePrices).values({
          id: uuidv4(),
          stripeProductId: productId,
          title: price.title,
          stripePriceId: livePrice.id,
          amount: Math.round(price.price * 100),
          currency: price.currency,
        })
      }
    })

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error creating stripe product:', error)
    // If anything fails (Stripe API calls or database operations),
    // the transaction will be rolled back automatically
    return c.json(
      { error: 'Failed to create stripe product' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
