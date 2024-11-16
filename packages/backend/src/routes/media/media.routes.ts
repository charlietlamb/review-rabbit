import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { HttpStatusCodes } from '@/src/http'
import { unauthorizedSchema } from '@/src/lib/configure-auth'

const tags = ['Media']

export const storeMedia = createRoute({
  path: '/media/store',
  method: 'post',
  summary: 'Store a media file',
  tags,
  request: {
    body: {
      description: 'Media file to store',
      content: {
        'application/json': {
          schema: z.object({
            path: z.string(),
            name: z.string(),
            size: z.number(),
            extension: z.string(),
            duration: z.number(),
            source: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        id: z.string(),
      }),
      'Media file stored.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to upload file'
    ),
    [HttpStatusCodes.NO_CONTENT]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'User image not uploaded'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'User not found'
    ),
    ...unauthorizedSchema,
  },
})

export type StoreMediaRoute = typeof storeMedia
