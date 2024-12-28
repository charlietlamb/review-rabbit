import { AppRouteHandler } from '@burse/hono/lib/types'
import { HttpStatusCodes } from '@burse/http'
import { stripeProducts } from '@burse/database/schema/stripe-products'
import { db } from '@burse/database'
import { eq } from 'drizzle-orm'
import type { GetStripeProductsRoute } from './stripe-products.routes'

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
