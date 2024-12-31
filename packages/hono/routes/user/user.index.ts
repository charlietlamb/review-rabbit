import { createRouter } from '@rabbit/hono/lib/create-app'
import * as handlers from '@rabbit/hono/routes/user/user.handlers'
import * as routes from '@rabbit/hono/routes/user/user.routes'

const router = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
  .openapi(routes.updateCurrency, handlers.updateCurrency)
  .openapi(routes.resetPassword, handlers.resetPassword)

export default router
