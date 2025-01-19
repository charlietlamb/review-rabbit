import { createRoute, z } from '@hono/zod-openapi'
import { unauthorizedSchema } from '@rabbit/hono/lib/configure-auth'
import { reviewWithDataSchema } from '@rabbit/database'
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

export const getReviews = createRoute({
  path: '/reviews',
  method: 'post',
  summary: 'Get reviews',
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
            locationId: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(reviewWithDataSchema),
      'Reviews fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch reviews'
    ),
    ...unauthorizedSchema,
  },
})

export type GetReviewsRoute = typeof getReviews

export const getReviewsByDateRange = createRoute({
  path: '/reviews/date-range',
  method: 'post',
  summary: 'Get reviews by date range',
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
            locationId: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(reviewWithDataSchema),
      'Reviews fetched by date range.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch reviews'
    ),
    ...unauthorizedSchema,
  },
})

export type GetReviewsByDateRangeRoute = typeof getReviewsByDateRange
