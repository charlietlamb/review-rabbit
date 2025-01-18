import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@rabbit/http'
import { jsonContent } from 'stoker/openapi/helpers'

const tags = ['Review']

export const review = createRoute({
  path: '/review',
  method: 'get',
  summary: 'Review a business',
  tags,
  request: {
    query: z.object({
      businessId: z.string(),
      method: z.enum(['sms', 'email', 'whatsapp']),
    }),
  },
  responses: {
    [HttpStatusCodes.MOVED_TEMPORARILY]: {
      description: 'Redirect to google review',
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Invalid review request'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to review business'
    ),
  },
})

export type ReviewRoute = typeof review
