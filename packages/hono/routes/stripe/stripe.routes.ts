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
        redirectUrl: z.string(),
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

export const connectRefresh = createRoute({
  path: '/stripe/connect/refresh/:accountId',
  method: 'get',
  summary: 'Refresh Stripe Connect account',
  tags,
  responses: {
    [HttpStatusCodes.MOVED_TEMPORARILY]: {
      description: 'Redirect to dashboard',
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Account ID is required'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to create Stripe Connect account'
    ),
  },
})

export type ConnectRefreshRoute = typeof connectRefresh

export const connectReturn = createRoute({
  path: '/stripe/connect/return/:accountId',
  method: 'get',
  summary: 'Return Stripe Connect account',
  tags,
  responses: {
    [HttpStatusCodes.MOVED_TEMPORARILY]: {
      description: 'Redirect to dashboard',
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Account ID is required'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to complete onboarding'
    ),
  },
})

export type ConnectReturnRoute = typeof connectReturn

export const connectGet = createRoute({
  path: '/stripe/connect/get',
  method: 'get',
  summary: 'Get Stripe Connect account',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        account: selectStripeConnectSchema.optional(),
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

export type ConnectGetRoute = typeof connectGet
