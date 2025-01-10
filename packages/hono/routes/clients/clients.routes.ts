import { HttpStatusCodes } from '@rabbit/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@rabbit/hono/lib/configure-auth'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { clientSchema } from '@rabbit/database/schema/app/clients'
import { clientValidationSchema } from '@rabbit/design-system/components/dashboard/clients/client-schema'
const tags = ['Clients']

export const getClients = createRoute({
  path: '/clients',
  method: 'post',
  summary: 'Get clients',
  tags,
  request: {
    body: {
      description: 'Pagination parameters',
      content: {
        'application/json': {
          schema: z.object({
            offset: z.number(),
            limit: z.number(),
            search: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(clientSchema),
      'Clients fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch clients'
    ),
    ...unauthorizedSchema,
  },
})

export type GetClientsRoute = typeof getClients

export const getClientById = createRoute({
  path: '/clients/get-by-id',
  method: 'post',
  summary: 'Get client by id',
  tags,
  request: {
    body: {
      description: 'Client ID',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(clientSchema, 'Client fetched.'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Client not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch client'
    ),
    ...unauthorizedSchema,
  },
})

export type GetClientByIdRoute = typeof getClientById

export const addClient = createRoute({
  path: '/clients/add',
  method: 'post',
  summary: 'Add a client',
  tags,
  request: {
    body: {
      description: 'Client data',
      content: {
        'application/json': {
          schema: clientValidationSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Client added.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to add client'
    ),
    ...unauthorizedSchema,
  },
})

export type AddClientRoute = typeof addClient

export const updateClient = createRoute({
  path: '/clients/update',
  method: 'post',
  summary: 'Update a client',
  tags,
  request: {
    body: {
      description: 'Client data',
      content: {
        'application/json': {
          schema: clientValidationSchema.extend({
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Client updated.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to update client'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateClientRoute = typeof updateClient

export const deleteClient = createRoute({
  path: '/clients/delete',
  method: 'post',
  summary: 'Delete a client',
  tags,
  request: {
    body: {
      description: 'Client ID',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Client deleted.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete client'
    ),
    ...unauthorizedSchema,
  },
})

export type DeleteClientRoute = typeof deleteClient

export const deleteBulkClients = createRoute({
  path: '/clients/delete-bulk',
  method: 'post',
  summary: 'Delete multiple clients',
  tags,
  request: {
    body: {
      description: 'Client IDs',
      content: {
        'application/json': {
          schema: z.object({ ids: z.array(z.string()) }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Clients deleted.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete clients'
    ),
    ...unauthorizedSchema,
  },
})

export type DeleteBulkClientsRoute = typeof deleteBulkClients

export const addBulkClients = createRoute({
  path: '/clients/add-bulk',
  method: 'post',
  summary: 'Add multiple clients',
  tags,
  request: {
    body: {
      description: 'Client data',
      content: {
        'application/json': {
          schema: z.array(clientValidationSchema),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Clients added.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to add clients'
    ),
    ...unauthorizedSchema,
  },
})

export type AddBulkClientsRoute = typeof addBulkClients
