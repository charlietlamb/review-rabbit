import { createRouter } from '@rabbit/hono/lib/create-app'
import * as handlers from '@rabbit/hono/routes/automations/automations.handlers'
import * as routes from '@rabbit/hono/routes/automations/automations.routes'

const router = createRouter()
  .openapi(routes.createAutomation, handlers.createAutomation)
  .openapi(routes.getAutomations, handlers.getAutomations)
  .openapi(routes.getAutomationById, handlers.getAutomationById)

export default router
