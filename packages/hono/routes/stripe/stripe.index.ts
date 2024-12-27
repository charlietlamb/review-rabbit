import { createRouter } from '@burse/hono/lib/create-app'
import * as routes from '@burse/hono/routes/stripe/stripe.routes'
import * as handlers from '@burse/hono/routes/stripe/stripe.handlers'

const router = createRouter()
  .openapi(routes.connect, handlers.connect)
  .openapi(routes.connectGet, handlers.connectGet)
  .openapi(routes.connectRefresh, handlers.connectRefresh)
  .openapi(routes.connectReturn, handlers.connectReturn)
  .openapi(routes.deauthorize, handlers.deauthorize)

export default router
