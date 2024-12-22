import { HttpStatusCodes } from '@remio/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@remio/hono/lib/configure-auth'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import {
  mediationDataSchema,
  mediationRequestSchema,
  mediationRequestWithPageSchema,
  mediationsRequestSchema,
} from '@remio/design-system/components/dashboard/mediation/mediation-types'
import { mediationWithDataSchema } from '@remio/database'

const tags = ['Mediations']

export const addMediation = createRoute({
  path: '/mediations/add',
  method: 'post',
  summary: 'Add a mediation',
  tags,
  request: {
    body: {
      description: 'Mediation data',
      content: {
        'application/json': {
          schema: mediationDataSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Mediation added.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to add mediation'
    ),
    ...unauthorizedSchema,
  },
})

export type AddMediationRoute = typeof addMediation

export const updateMediation = createRoute({
  path: '/mediations/update',
  method: 'post',
  summary: 'Update a mediation',
  tags,
  request: {
    body: {
      description: 'Mediation data',
      content: {
        'application/json': {
          schema: mediationDataSchema.extend({
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Mediation updated.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to update mediation'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateMediationRoute = typeof updateMediation

export const deleteMediation = createRoute({
  path: '/mediations/delete',
  method: 'post',
  summary: 'Delete a mediation',
  tags,
  request: {
    body: {
      description: 'Mediation ID',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Mediation deleted.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete mediation'
    ),
    ...unauthorizedSchema,
  },
})

export type DeleteMediationRoute = typeof deleteMediation

export const getMediations = createRoute({
  path: '/mediations/get',
  method: 'post',
  summary: 'Get mediations',
  tags,
  request: {
    body: {
      description: 'Mediation request',
      content: {
        'application/json': {
          schema: mediationsRequestSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(mediationWithDataSchema),
      'Mediations fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch mediations'
    ),
    ...unauthorizedSchema,
  },
})

export type GetMediationsRoute = typeof getMediations

export const getMediation = createRoute({
  path: '/mediations/get-by-id',
  method: 'post',
  summary: 'Get mediation by id',
  tags,
  request: {
    body: {
      description: 'Mediation request',
      content: {
        'application/json': {
          schema: mediationRequestSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      mediationWithDataSchema,
      'Mediation fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch mediations'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Mediation not found'
    ),
    ...unauthorizedSchema,
  },
})

export type GetMediationRoute = typeof getMediation

export const getMediationsByPage = createRoute({
  path: '/mediations/get-by-page',
  method: 'post',
  summary: 'Get mediations by page',
  tags,
  request: {
    body: {
      description: 'Mediation request',
      content: {
        'application/json': {
          schema: mediationRequestWithPageSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(mediationWithDataSchema),
      'Mediations fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch mediations'
    ),
    ...unauthorizedSchema,
  },
})

export type GetMediationsByPageRoute = typeof getMediationsByPage
