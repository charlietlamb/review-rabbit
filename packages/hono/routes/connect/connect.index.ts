import { createRouter } from '@dubble/hono/lib/create-app'
import * as handlers from '@dubble/hono/routes/connect/connect.handlers'
import * as routes from '@dubble/hono/routes/connect/connect.routes'

const router = createRouter()
  .openapi(routes.connectGet, handlers.connectGet)
  .openapi(routes.connectPost, handlers.connectPost)

export default router
