import { createRouter } from '@rabbit/hono/lib/create-app'
import * as handlers from '@rabbit/hono/routes/google/google.handlers'
import * as routes from '@rabbit/hono/routes/google/google.routes'

const router = createRouter().openapi(
  routes.getReviews,
  handlers.getReviewsHandler
)

export default router
