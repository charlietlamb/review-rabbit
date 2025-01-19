import { createRouter } from '@rabbit/hono/lib/create-app'
import * as handlers from '@rabbit/hono/routes/review/review.handlers'
import * as routes from '@rabbit/hono/routes/review/review.routes'

const router = createRouter()
  .openapi(routes.review, handlers.review)
  .openapi(routes.getReviews, handlers.getReviews)
  .openapi(routes.getReviewsByDateRange, handlers.getReviewsByDateRange)

export default router
