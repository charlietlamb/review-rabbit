import { createRouter } from '@/src/lib/create-app'
import * as handlers from './dub.handlers'
import * as routes from './dub.routes'

const router = createRouter()
  .openapi(routes.createDub, handlers.createDub)
  .openapi(routes.createDubTask, handlers.createDubTask)

export default router
