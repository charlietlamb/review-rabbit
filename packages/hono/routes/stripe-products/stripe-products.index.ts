import { createRouter } from '@burse/hono/lib/create-app'
import * as routes from '@burse/hono/routes/stripe-products/stripe-products.routes'
import * as handlers from '@burse/hono/routes/stripe-products/stripe-products.handlers'

const router = createRouter()
  .openapi(routes.getStripeProducts, handlers.getStripeProducts)
  .openapi(routes.createStripeProduct, handlers.createStripeProduct)

export default router
