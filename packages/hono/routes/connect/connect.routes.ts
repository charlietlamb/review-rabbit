import { HttpStatusCodes } from '@dubble/http'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'

const tags = ['Connect']

export const connectGoogle = createRoute({
  path: '/connect/google',
  method: 'get',
  summary: 'Connect to Google',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Connected to Google'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to connect to Google'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to connect to Google'
    ),
  },
})

export type ConnectGoogleRoute = typeof connectGoogle
