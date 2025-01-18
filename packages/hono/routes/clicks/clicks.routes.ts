import { HttpStatusCodes } from '@rabbit/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@rabbit/hono/lib/configure-auth'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { clickWithDataSchema } from '@rabbit/database/schema/app/clicks'

const tags = ['Clicks']

export const getClicks = createRoute({
  path: '/clicks',
  method: 'post',
  summary: 'Get clicks',
  tags,
  request: {
    body: {
      description: 'Pagination parameters',
      content: {
        'application/json': {
          schema: z.object({
            offset: z.number(),
            limit: z.number(),
            businessId: z.string(),
            automationItemId: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(clickWithDataSchema),
      'Clicks fetched.'
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

export type GetClicksRoute = typeof getClicks

export const getClicksByDateRange = createRoute({
  path: '/clicks/date-range',
  method: 'post',
  summary: 'Get clicks by date range',
  tags,
  request: {
    body: {
      description: 'Date range parameters',
      content: {
        'application/json': {
          schema: z.object({
            from: z.string(),
            to: z.string(),
            businessId: z.string(),
            automationItemId: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(clickWithDataSchema),
      'Clicks fetched by date range.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch clicks'
    ),
    ...unauthorizedSchema,
  },
})

export type GetClicksByDateRangeRoute = typeof getClicksByDateRange
