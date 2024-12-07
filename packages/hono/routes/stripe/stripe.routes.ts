import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@remio/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@remio/hono/lib/configure-auth'
import { selectStripeConnectSchema } from '@remio/database'

const tags = ['Stripe']

export const connect = createRoute({
  path: '/stripe/connect',
  method: 'get',
  summary: 'Connect to Stripe',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Stripe connected.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to create Stripe Connect account'
    ),
    ...unauthorizedSchema,
  },
})

export type ConnectRoute = typeof connect

export const connectGet = createRoute({
  path: '/stripe/connect/get',
  method: 'get',
  summary: 'Get Stripe Connect account',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectStripeConnectSchema.optional(),
      'Stripe connected.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to create Stripe Connect account'
    ),
    ...unauthorizedSchema,
  },
})

export type ConnectGetRoute = typeof connectGet
