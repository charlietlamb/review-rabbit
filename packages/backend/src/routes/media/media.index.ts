import { createRouter } from '@/src/lib/create-app'
import * as handlers from './media.handlers'
import * as routes from './media.routes'

const router = createRouter().openapi(routes.uploadMedia, handlers.uploadMedia)

export default router
