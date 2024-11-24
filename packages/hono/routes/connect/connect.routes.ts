import { HttpStatusCodes } from '@dubble/http'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { connectSchema } from './connect.schema'

const tags = ['Connect']

//use the better-auth docs to create my own oauth implementation
export const connectGet = createRoute({
  path: '/connect/:providerId',
  method: 'get',
  summary: 'Connect to a provider',
  tags,
  request: {
    query: connectSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Connected to a provider'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to connect to a provider'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to connect to a provider'
    ),
  },
})

export type ConnectGetRoute = typeof connectGet

export const connectPost = createRoute({
  path: '/connect/:providerId',
  method: 'get',
  summary: 'Connect to a provider',
  tags,
  request: {
    body: jsonContent(connectSchema, 'Connect schema'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Connected to a provider'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to connect to a provider'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to connect to a provider'
    ),
  },
})

export type ConnectGoogleRoute = typeof connectPost
