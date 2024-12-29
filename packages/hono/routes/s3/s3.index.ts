import { createRouter } from '@burse/hono/lib/create-app'
import * as handlers from '@burse/hono/routes/s3/s3.handlers'
import * as routes from '@burse/hono/routes/s3/s3.routes'

const router = createRouter()
  .openapi(routes.uploadProfileImage, handlers.uploadProfileImage)
  .openapi(routes.getPresignedUrl, handlers.getPresignedUrl)
  .openapi(
    routes.getProfileImagePresignedUrl,
    handlers.getProfileImagePresignedUrl
  )
  .openapi(routes.getUploadPresignedUrl, handlers.getUploadPresignedUrl)

export default router
