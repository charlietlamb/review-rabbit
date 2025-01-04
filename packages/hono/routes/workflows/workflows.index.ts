import { createRouter } from '@rabbit/hono/lib/create-app'
import * as handlers from '@rabbit/hono/routes/workflows/workflows.handlers'
import * as routes from '@rabbit/hono/routes/workflows/workflows.routes'

const router = createRouter()
  .openapi(routes.createWorkflow, handlers.createWorkflow)
  .openapi(routes.getWorkflows, handlers.getWorkflows)
  .openapi(routes.getWorkflowById, handlers.getWorkflowById)
  .openapi(routes.updateWorkflow, handlers.updateWorkflow)
  .openapi(routes.deleteWorkflow, handlers.deleteWorkflow)

export default router
