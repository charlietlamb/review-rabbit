import { createRouter } from '@rabbit/hono/lib/create-app'
import * as handlers from '@rabbit/hono/routes/review/review.handler'
import * as routes from '@rabbit/hono/routes/review/review.routes'

const router = createRouter().openapi(routes.review, handlers.review)

export default router
