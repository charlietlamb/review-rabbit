import { createRouter } from '@rabbit/hono/lib/create-app'
import * as handlers from '@rabbit/hono/routes/email/email.handlers'
import * as routes from '@rabbit/hono/routes/email/email.routes'

// sendVerifyEmail not used but an example of email route
const router = createRouter().openapi(
  routes.sendVerifyEmail,
  handlers.sendVerifyEmail
)
export default router
