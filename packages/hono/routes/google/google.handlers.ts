import { AppRouteHandler } from '@rabbit/hono/lib/types'
import { HttpStatusCodes } from '@rabbit/http'
import { getReviews } from '@rabbit/google/lib/get-reviews'
import { db } from '@rabbit/database'
import { eq } from 'drizzle-orm'
import { accounts } from '@rabbit/database/schema'
import { GetReviewsRoute } from '@rabbit/hono/routes/google/google.routes'

export const getReviewsHandler: AppRouteHandler<GetReviewsRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { page } = await c.req.json()

  const account = await db.query.accounts.findFirst({
    where: eq(accounts.userId, user.id),
  })
  if (!account) {
    return c.json({ error: 'Account not found' }, HttpStatusCodes.NOT_FOUND)
  }
  try {
    const reivews = await getReviews(page, account)
    return c.json(reivews, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return c.json(
      { error: 'Failed to fetch clients' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
