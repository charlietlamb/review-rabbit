import { createRouter } from '@dubble/hono/lib/create-app'
import * as handlers from '@dubble/hono/routes/dub/dub.handlers'
import * as routes from '@dubble/hono/routes/dub/dub.routes'

const router = createRouter()
  .openapi(routes.createDub, handlers.createDub)
  .openapi(routes.createDubTask, handlers.createDubTask)

export default router
