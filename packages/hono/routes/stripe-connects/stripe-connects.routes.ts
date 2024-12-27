import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@burse/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@burse/hono/lib/configure-auth'
import { selectStripeConnectSchema } from '@burse/database'

const tags = ['Stripe Connects']

export const getStripeConnects = createRoute({
  path: '/stripe-connects',
  method: 'post',
  summary: 'Get all Stripe Connect accounts',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            offset: z.number(),
            limit: z.number(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        stripeConnects: z.array(selectStripeConnectSchema),
      }),
      'Successfully retrieved stripe connects'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch stripe connects'
    ),
    ...unauthorizedSchema,
  },
})

export type GetStripeConnectsRoute = typeof getStripeConnects

export const getStripeConnectById = createRoute({
  path: '/stripe-connects-by-id',
  method: 'get',
  summary: 'Get a Stripe Connect account by ID',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        stripeConnect: selectStripeConnectSchema,
      }),
      'Successfully retrieved stripe connect'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Stripe connect not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch stripe connect'
    ),
    ...unauthorizedSchema,
  },
})

export type GetStripeConnectByIdRoute = typeof getStripeConnectById
