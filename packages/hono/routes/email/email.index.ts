import { createRouter } from '@dubble/hono/lib/create-app'
import * as handlers from '@dubble/hono/routes/email/email.handlers'
import * as routes from '@dubble/hono/routes/email/email.routes'

// sendVerifyEmail not used but an example of email route
const router = createRouter().openapi(
  routes.sendVerifyEmail,
  handlers.sendVerifyEmail
)
export default router
