import { HttpStatusCodes } from '@remio/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@remio/hono/lib/configure-auth'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { clientSchema } from '@remio/database'
import { clientValidationSchema } from '@remio/design-system/components/dashboard/clients/client-schema'
import {
  clientChartsRequestSchema,
  clientsChartSchema,
} from '@remio/design-system/components/dashboard/clients/client-types'

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
          schema: z.object({
            ...clientValidationSchema.shape,
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

export const getClientsChart = createRoute({
  path: '/clients/chart',
  method: 'post',
  summary: 'Get clients chart',
  tags,
  request: {
    body: {
      description: 'Client charts request',
      content: {
        'application/json': {
          schema: clientChartsRequestSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      clientsChartSchema,
      'Clients chart fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch clients chart'
    ),
    ...unauthorizedSchema,
  },
})

export type GetClientsChartRoute = typeof getClientsChart
