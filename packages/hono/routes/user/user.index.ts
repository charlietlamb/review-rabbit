import { createRouter } from '@ff/hono/lib/create-app'
import * as handlers from '@ff/hono/routes/user/user.handlers'
import * as routes from '@ff/hono/routes/user/user.routes'

const router = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
  .openapi(routes.resetPassword, handlers.resetPassword)

export default router
