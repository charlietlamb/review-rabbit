import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@burse/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@burse/hono/lib/configure-auth'
import { selectStripeConnectSchema } from '@burse/database'

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
      'Stripe OAuth redirect URL.'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Account already connected'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to create Stripe Connect OAuth URL'
    ),
    ...unauthorizedSchema,
  },
})

export type ConnectRoute = typeof connect

export const connectRefresh = createRoute({
  path: '/stripe/connect/refresh/:accountId',
  method: 'get',
  summary: 'Refresh Stripe Connect OAuth token',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Token refreshed successfully'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Account ID is required or no refresh token found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to refresh OAuth token'
    ),
  },
})

export type ConnectRefreshRoute = typeof connectRefresh

export const connectReturn = createRoute({
  path: '/stripe/connect/oauth/callback',
  method: 'get',
  summary: 'Handle Stripe Connect OAuth callback',
  tags,
  request: {
    query: z.object({
      code: z.string(),
      state: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.MOVED_TEMPORARILY]: {
      description: 'Redirect to dashboard',
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Invalid OAuth callback'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to complete OAuth flow'
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
      'Failed to get Stripe Connect account'
    ),
    ...unauthorizedSchema,
  },
})

export type ConnectGetRoute = typeof connectGet

export const deauthorize = createRoute({
  path: '/stripe/deauthorize/:accountId',
  method: 'post',
  summary: 'Deauthorize Stripe Connect account',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Account deauthorized successfully'
    ),
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
      'Failed to deauthorize account'
    ),
    ...unauthorizedSchema,
  },
})

export type DeauthorizeRoute = typeof deauthorize
