import { createRouter } from '@/src/lib/create-app'
import * as handlers from './user.handlers'
import * as routes from './user.routes'

const router = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
  .openapi(routes.resetPassword, handlers.resetPassword)

export default router
