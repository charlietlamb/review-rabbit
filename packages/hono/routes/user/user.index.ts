import { createRouter } from '@burse/hono/lib/create-app'
import * as handlers from '@burse/hono/routes/user/user.handlers'
import * as routes from '@burse/hono/routes/user/user.routes'

const router = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
  .openapi(routes.updateCurrency, handlers.updateCurrency)
  .openapi(routes.resetPassword, handlers.resetPassword)

export default router
