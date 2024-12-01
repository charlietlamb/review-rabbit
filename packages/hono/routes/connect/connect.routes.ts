import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { jsonContent } from 'stoker/openapi/helpers'
import { HttpStatusCodes } from '@ff/http'
import { unauthorizedSchema } from '@ff/hono/lib/configure-auth'
import { connects, selectConnectSchema } from '@ff/database'

const tags = ['Connect']

const commonErrorResponses = {
  [HttpStatusCodes.NOT_FOUND]: jsonContent(
    z.object({
      error: z.string(),
    }),
    'Resource not found'
  ),
  [HttpStatusCodes.BAD_REQUEST]: jsonContent(
    z.object({
      error: z.string(),
    }),
    'Bad request'
  ),
  ...unauthorizedSchema,
}

// Route for initiating OAuth flow
export const connectInitiate = createRoute({
  path: '/connect/:providerId',
  method: 'get',
  summary: 'Initiate OAuth connection flow',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        redirectURI: z.string(),
      }),
      'Redirect to provider authorization URL'
    ),
    ...commonErrorResponses,
  },
})

// Route for OAuth callback
export const connectCallback = createRoute({
  path: '/connect/:providerId/callback',
  method: 'get',
  summary: 'Handle OAuth callback',
  tags,
  request: {
    query: z.object({
      code: z.string(),
      state: z.string(),
    }),
  },
  responses: {
    [302]: {
      description: 'Redirect to dashboard',
    },
    ...commonErrorResponses,
  },
})

// Route for refreshing tokens
export const refreshTokens = createRoute({
  path: '/connect/:connectionId/refresh',
  method: 'post',
  summary: 'Refresh OAuth tokens',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Tokens refreshed successfully'
    ),
    ...commonErrorResponses,
  },
})

export const disconnect = createRoute({
  path: '/connect/:connectionId',
  method: 'delete',
  summary: 'Disconnect OAuth provider',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Provider disconnected successfully'
    ),
    ...commonErrorResponses,
  },
})

export const getProviderConnects = createRoute({
  path: '/connect/:providerId/get',
  method: 'get',
  summary: 'Get connections for a specific provider',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        connections: z.array(selectConnectSchema),
      }),
      'Provider connections'
    ),
    ...commonErrorResponses,
  },
})

export type ConnectInitiateRoute = typeof connectInitiate
export type ConnectCallbackRoute = typeof connectCallback
export type RefreshTokensRoute = typeof refreshTokens
export type DisconnectRoute = typeof disconnect
export type GetProviderConnectsRoute = typeof getProviderConnects
