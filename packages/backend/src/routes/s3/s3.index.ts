import { createRouter } from '@/src/lib/create-app'
import * as handlers from './s3.handlers'
import * as routes from './s3.routes'

const router = createRouter()
  .openapi(routes.uploadProfileImage, handlers.uploadProfileImage)
  .openapi(routes.getPresignedUrl, handlers.getPresignedUrl)

export default router
