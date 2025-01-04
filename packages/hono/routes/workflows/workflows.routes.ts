import { HttpStatusCodes } from '@rabbit/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@rabbit/hono/lib/configure-auth'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { workflowFormSchema, workflowWithItems } from '@rabbit/database'

const tags = ['Workflows']

export const getWorkflows = createRoute({
  path: '/workflows',
  method: 'post',
  summary: 'Get workflows',
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
      z.array(workflowWithItems),
      'Workflows fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch workflows'
    ),
    ...unauthorizedSchema,
  },
})

export type GetWorkflowsRoute = typeof getWorkflows

export const getWorkflowById = createRoute({
  path: '/workflows/get-by-id',
  method: 'post',
  summary: 'Get workflow by id',
  tags,
  request: {
    body: {
      description: 'Workflow ID',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(workflowWithItems, 'Workflow fetched.'),
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
      'Failed to fetch workflow'
    ),
    ...unauthorizedSchema,
  },
})

export type GetWorkflowByIdRoute = typeof getWorkflowById

export const createWorkflow = createRoute({
  path: '/workflows/create',
  method: 'post',
  summary: 'Create a workflow',
  tags,
  request: {
    body: {
      description: 'Client data',
      content: {
        'application/json': {
          schema: workflowFormSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Workflow added.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to add workflow'
    ),
    ...unauthorizedSchema,
  },
})

export type CreateWorkflowRoute = typeof createWorkflow

export const updateWorkflow = createRoute({
  path: '/workflows/update',
  method: 'post',
  summary: 'Update a workflow',
  tags,
  request: {
    body: {
      description: 'Client data',
      content: {
        'application/json': {
          schema: workflowFormSchema.extend({
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Workflow updated.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to update workflow'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateWorkflowRoute = typeof updateWorkflow

export const deleteWorkflow = createRoute({
  path: '/workflows/delete',
  method: 'post',
  summary: 'Delete a workflow',
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
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Workflow deleted.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete workflow'
    ),
    ...unauthorizedSchema,
  },
})

export type DeleteWorkflowRoute = typeof deleteWorkflow
