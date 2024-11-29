import { createRouter } from '@dubble/hono/lib/create-app'
import * as handlers from './connect.handlers'
import * as routes from './connect.routes'

const router = createRouter()
  .openapi(routes.connectInitiate, handlers.connectInitiate)
  .openapi(routes.connectCallback, handlers.connectCallback)
  .openapi(routes.refreshTokens, handlers.refreshTokens)
  .openapi(routes.disconnect, handlers.disconnect)
  .openapi(routes.getProviderConnects, handlers.getProviderConnects)
export default router
