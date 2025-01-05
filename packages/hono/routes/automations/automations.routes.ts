import { HttpStatusCodes } from '@rabbit/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@rabbit/hono/lib/configure-auth'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import {
  automationFormSchema,
  automationWithItems,
} from '@rabbit/database/types/automation-types'

const tags = ['Automations']

export const getAutomations = createRoute({
  path: '/automations',
  method: 'post',
  summary: 'Get automations',
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
      z.array(automationWithItems),
      'Automations fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch automations'
    ),
    ...unauthorizedSchema,
  },
})

export type GetAutomationsRoute = typeof getAutomations

export const getAutomationById = createRoute({
  path: '/automations/get-by-id',
  method: 'post',
  summary: 'Get automation by id',
  tags,
  request: {
    body: {
      description: 'Automation ID',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      automationWithItems,
      'Automation fetched.'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Automation not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch automation'
    ),
    ...unauthorizedSchema,
  },
})

export type GetAutomationByIdRoute = typeof getAutomationById

export const createAutomation = createRoute({
  path: '/automations/create',
  method: 'post',
  summary: 'Create a automation',
  tags,
  request: {
    body: {
      description: 'Client data',
      content: {
        'application/json': {
          schema: automationFormSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.string(), 'Automation added.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to add automation'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Workflow not found'
    ),
    ...unauthorizedSchema,
  },
})

export type CreateAutomationRoute = typeof createAutomation

export const updateAutomation = createRoute({
  path: '/automations/update',
  method: 'post',
  summary: 'Update a automation',
  tags,
  request: {
    body: {
      description: 'Client data',
      content: {
        'application/json': {
          schema: automationFormSchema.extend({
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Automation updated.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to update automation'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateAutomationRoute = typeof updateAutomation

export const deleteAutomation = createRoute({
  path: '/automations/delete',
  method: 'post',
  summary: 'Delete a automation',
  tags,
  request: {
    body: {
      description: 'Automation ID',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Automation deleted.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete automation'
    ),
    ...unauthorizedSchema,
  },
})

export type DeleteAutomationRoute = typeof deleteAutomation