import { createRouter } from '@rabbit/hono/lib/create-app'
import * as routes from '@rabbit/hono/routes/clicks/clicks.routes'
import * as handlers from '@rabbit/hono/routes/clicks/clicks.handlers'

const router = createRouter()
  .openapi(routes.getClicks, handlers.getClicks)
  .openapi(routes.getClicksByDateRange, handlers.getClicksByDateRange)

export default router
