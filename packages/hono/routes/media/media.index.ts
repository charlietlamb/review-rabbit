import { createRouter } from '@remio/hono/lib/create-app'
import * as handlers from '@remio/hono/routes/media/media.handlers'
import * as routes from '@remio/hono/routes/media/media.routes'

const router = createRouter()
  .openapi(routes.storeMedia, handlers.storeMedia)
  .openapi(routes.fetchMedia, handlers.fetchMedia)
  .openapi(routes.fetchMediaBatch, handlers.fetchMediaBatch)

export default router
