import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { HttpStatusCodes } from '@ff/http'
import { unauthorizedSchema } from '@ff/hono/lib/configure-auth'
import { createOptionTypes } from '@ff/design-system/components/dashboard/create/options/create-options-data'
import { providerIds } from '@ff/design-system/lib/providers'
import { scheduleContentSchema } from './schedule.types'

const tags = ['Schedule']

export const scheduleContent = createRoute({
  path: '/schedule/:providerId/:type',
  method: 'post',
  summary: 'Schedule content for a specific provider and content type',
  tags,
  request: {
    params: z.object({
      providerId: z.enum(providerIds),
      type: z.enum(createOptionTypes),
    }),
    body: {
      description: 'Content scheduling details',
      content: {
        'application/json': {
          schema: scheduleContentSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
        data: z.any(),
      }),
      'Content scheduled successfully'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Invalid request parameters'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to schedule content'
    ),
    ...unauthorizedSchema,
  },
})

export type ScheduleContentRoute = typeof scheduleContent
