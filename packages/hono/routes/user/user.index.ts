import { createRouter } from '@dubble/hono/lib/create-app'
import * as handlers from '@dubble/hono/routes/user/user.handlers'
import * as routes from '@dubble/hono/routes/user/user.routes'

const router = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
  .openapi(routes.resetPassword, handlers.resetPassword)

export default router
