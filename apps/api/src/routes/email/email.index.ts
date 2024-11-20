import { createRouter } from '@/src/lib/create-app'
import * as handlers from './email.handlers'
import * as routes from './email.routes'

// sendVerifyEmail not used but an example of email route
const router = createRouter().openapi(
  routes.sendVerifyEmail,
  handlers.sendVerifyEmail
)
export default router
