import { createRouter } from '@remio/hono/lib/create-app'
import * as handlers from '@remio/hono/routes/user/user.handlers'
import * as routes from '@remio/hono/routes/user/user.routes'

const router = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
  .openapi(routes.resetPassword, handlers.resetPassword)

export default router
