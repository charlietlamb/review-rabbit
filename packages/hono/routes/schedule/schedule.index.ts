import { createRouter } from '@ff/hono/lib/create-app'
import * as handlers from '@ff/hono/routes/schedule/schedule.handlers'
import * as routes from '@ff/hono/routes/schedule/schedule.routes'

const router = createRouter().openapi(
  routes.scheduleContent,
  handlers.scheduleContent
)

export default router
