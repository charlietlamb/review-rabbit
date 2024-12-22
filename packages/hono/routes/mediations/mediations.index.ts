import { createRouter } from '@remio/hono/lib/create-app'
import * as routes from '@remio/hono/routes/mediations/mediations.routes'
import * as handlers from '@remio/hono/routes/mediations/mediations.handlers'

const router = createRouter()
  .openapi(routes.addMediation, handlers.addMediation)
  .openapi(routes.updateMediation, handlers.updateMediation)
  .openapi(routes.deleteMediation, handlers.deleteMediation)
  .openapi(routes.getMediations, handlers.getMediations)
  .openapi(routes.getMediation, handlers.getMediation)
  .openapi(routes.getMediationsByPage, handlers.getMediationsByPage)

export default router
