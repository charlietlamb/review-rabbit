import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { jsonContent } from 'stoker/openapi/helpers'
import { HttpStatusCodes } from '@dubble/http'
import { unauthorizedSchema } from '@dubble/hono/lib/configure-auth'

const tags = ['Connect']

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
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Invalid provider'
    ),
    ...unauthorizedSchema,
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
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Connection successful'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Invalid callback parameters'
    ),
    ...unauthorizedSchema,
  },
})

// Route for refreshing tokens
export const refreshTokens = createRoute({
  path: '/connect/:providerId/refresh',
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
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to refresh tokens'
    ),
    ...unauthorizedSchema,
  },
})

// Route for disconnecting provider
export const disconnect = createRoute({
  path: '/connect/:providerId',
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
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to disconnect provider'
    ),
    ...unauthorizedSchema,
  },
})

export type ConnectInitiateRoute = typeof connectInitiate
export type ConnectCallbackRoute = typeof connectCallback
export type RefreshTokensRoute = typeof refreshTokens
export type DisconnectRoute = typeof disconnect
