import { createRouter } from '@/src/lib/create-app'
import * as handlers from './auth.handlers'
import * as routes from './auth.routes'

const router = createRouter().openapi(routes.user, handlers.user)

export default router
