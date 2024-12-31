import { createRouter } from '@rabbit/hono/lib/create-app'
import * as handlers from '@rabbit/hono/routes/business/business.handlers'
import * as routes from '@rabbit/hono/routes/business/business.routes'

const router = createRouter()
  .openapi(routes.create, handlers.create)
  .openapi(routes.get, handlers.get)
  .openapi(routes.getById, handlers.getById)
  .openapi(routes.update, handlers.update)
  .openapi(routes.deleteBusiness, handlers.deleteBusiness)

export default router
