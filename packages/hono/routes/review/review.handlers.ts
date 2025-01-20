import {
  GetReviewsByDateRangeRoute,
  GetReviewsRoute,
  ReviewRoute,
} from '@rabbit/hono/routes/review/review.routes'
import { AppRouteHandler } from '@rabbit/hono/lib/types'
import { and, between, eq, sql } from 'drizzle-orm'
import { HttpStatusCodes } from '@rabbit/http'
import {
  businesses,
  clicks,
  reviews,
  ReviewWithData,
} from '@rabbit/database/schema'
import { getDb } from '@rabbit/database'
import { transformReview } from '@rabbit/design-system/lib/transforms/review-transform'

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
  const db = getDb(c.env)
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

export const getReviews: AppRouteHandler<GetReviewsRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const db = getDb(c.env)
  const { offset, limit, locationId, businessId } = await c.req.valid('json')

  try {
    const results = await db.query.reviews.findMany({
      where: and(
        eq(reviews.businessId, businessId),
        locationId ? eq(reviews.locationId, locationId) : undefined
      ),
      offset,
      limit,
      with: {
        business: true,
        location: true,
      },
      orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
    })

    return c.json(results.map(transformReview), HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return c.json(
      { error: 'Failed to fetch reviews' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getReviewsByDateRange: AppRouteHandler<
  GetReviewsByDateRangeRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const db = getDb(c.env)
  const { from, to, businessId, locationId } = await c.req.valid('json')
  try {
    const reviewData = await db.query.reviews.findMany({
      where: and(
        eq(reviews.businessId, businessId),
        locationId ? eq(reviews.locationId, locationId) : undefined,
        between(reviews.createdAt, sql`timestamp ${from}`, sql`timestamp ${to}`)
      ),
      with: {
        business: true,
        location: true,
      },
    })

    return c.json(reviewData.map(transformReview), HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching reviews by date range:', error)
    return c.json(
      { error: 'Failed to fetch reviews by date range' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
