import { createRouter } from '@rabbit/hono/lib/create-app'
import * as handlers from '@rabbit/hono/routes/automations/automations.handlers'
import * as routes from '@rabbit/hono/routes/automations/automations.routes'

const router = createRouter()
  .openapi(routes.createAutomation, handlers.createAutomation)
  .openapi(routes.getAutomations, handlers.getAutomations)
  .openapi(routes.getAutomationById, handlers.getAutomationById)
  .openapi(routes.getAutomationItemsByDate, handlers.getAutomationItemsByDate)
  .openapi(routes.updateAutomationItem, handlers.updateAutomationItem)
  .openapi(
    routes.updateAutomationItemStatus,
    handlers.updateAutomationItemStatus
  )
  .openapi(routes.deleteBulkAutomations, handlers.deleteBulkAutomations)
  .openapi(routes.deleteAutomation, handlers.deleteAutomation)
  .openapi(routes.triggerDemoAutomation, handlers.triggerDemoAutomation)
  .openapi(routes.getAutomationsByDateRange, handlers.getAutomationsByDateRange)
export default router
