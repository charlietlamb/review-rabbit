import { ReviewRoute } from '@rabbit/hono/routes/review/review.routes'
import { AppRouteHandler } from '@rabbit/hono/lib/types'
import { db } from '@rabbit/database'
import { eq } from 'drizzle-orm'
import { HttpStatusCodes } from '@rabbit/http'
import { businesses, clicks } from '@rabbit/database/schema'

export const review: AppRouteHandler<ReviewRoute> = async (c) => {
  const { businessId, method } = c.req.query()
  if (!businessId) {
    return c.json(
      { error: 'Business ID is required' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  if (!method) {
    return c.json({ error: 'Method is required' }, HttpStatusCodes.BAD_REQUEST)
  }

  const business = await db.query.businesses.findFirst({
    where: eq(businesses.id, businessId),
  })

  if (!business) {
    return c.json({ error: 'Business not found' }, HttpStatusCodes.NOT_FOUND)
  }

  await db.insert(clicks).values({
    businessId,
    method,
  })

  return c.redirect(business.url, HttpStatusCodes.MOVED_TEMPORARILY)
}
