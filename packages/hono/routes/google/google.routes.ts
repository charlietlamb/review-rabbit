import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@rabbit/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@rabbit/hono/lib/configure-auth'
import { reviewSchema } from '@rabbit/google/types'

const tags = ['Google']

export const getReviews = createRoute({
  path: '/google/reviews',
  method: 'post',
  summary: 'Get reviews for a business',
  tags,
  request: {
    body: {
      description: 'Pagination parameters',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(reviewSchema),
      'Reviews fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch reviews.'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Account not found.'
    ),
    ...unauthorizedSchema,
  },
})

export type GetReviewsRoute = typeof getReviews
