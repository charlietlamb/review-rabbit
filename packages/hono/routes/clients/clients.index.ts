import { createRouter } from '@rabbit/hono/lib/create-app'
import * as routes from '@rabbit/hono/routes/clients/clients.routes'
import * as handlers from '@rabbit/hono/routes/clients/clients.handlers'

const router = createRouter()
  .openapi(routes.getClients, handlers.getClients)
  .openapi(routes.getClientById, handlers.getClientById)
  .openapi(routes.addClient, handlers.addClient)
  .openapi(routes.updateClient, handlers.updateClient)
  .openapi(routes.deleteClient, handlers.deleteClient)

export default router
