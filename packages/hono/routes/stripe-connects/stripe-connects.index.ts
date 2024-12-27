import { createRouter } from '@burse/hono/lib/create-app'
import * as routes from '@burse/hono/routes/stripe-connects/stripe-connects.routes'
import * as handlers from '@burse/hono/routes/stripe-connects/stripe-connects.handlers'

const router = createRouter()
  .openapi(routes.getStripeConnects, handlers.getStripeConnects)
  .openapi(routes.getStripeConnectById, handlers.getStripeConnectById)

export default router
