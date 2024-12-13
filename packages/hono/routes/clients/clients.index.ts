import { createRouter } from '@remio/hono/lib/create-app'
import * as routes from '@remio/hono/routes/clients/clients.routes'
import * as handlers from '@remio/hono/routes/clients/clients.handlers'

const router = createRouter()
  .openapi(routes.getClients, handlers.getClients)
  .openapi(routes.getClientById, handlers.getClientById)
  .openapi(routes.addClient, handlers.addClient)
  .openapi(routes.updateClient, handlers.updateClient)
  .openapi(routes.deleteClient, handlers.deleteClient)
  .openapi(routes.getClientsChart, handlers.getClientsChart)

export default router
