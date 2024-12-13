import { createRouter } from '@remio/hono/lib/create-app'
import * as routes from '@remio/hono/routes/mediations/mediations.routes'
import * as handlers from '@remio/hono/routes/mediations/mediations.handlers'

const router = createRouter()
  .openapi(routes.getMediations, handlers.getMediations)
  .openapi(routes.addMediation, handlers.addMediation)
  .openapi(routes.updateMediation, handlers.updateMediation)
  .openapi(routes.getMediation, handlers.getMediation)
  .openapi(routes.getMediations, handlers.getMediations)

export default router
