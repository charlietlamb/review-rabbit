import { createRouter } from '@/src/lib/create-app'
import * as handlers from './email.handlers'
import * as routes from './email.routes'

const router = createRouter()
  .openapi(routes.sendVerifyEmail, handlers.sendVerifyEmail)
  .openapi(routes.verifyEmail, handlers.verifyEmail)
  .openapi(routes.sendResetPasswordEmail, handlers.sendResetPasswordEmail)
export default router
