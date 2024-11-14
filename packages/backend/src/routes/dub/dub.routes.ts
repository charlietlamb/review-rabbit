import { HttpStatusCodes } from '@/src/http'
import { z } from 'zod'
import { unauthorizedSchema } from '@/src/lib/configure-auth'
import { createRoute } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'

const tags = ['Dub']

export const createDub = createRoute({
  path: '/dub',
  method: 'post',
  summary: 'Create a dub on 11Labs',
  tags,
  request: {
    body: {
      description: 'File to upload',
      content: {
        'application/json': {
          schema: z.object({
            url: z.string(),
            language: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        dubbingId: z.string(),
      }),
      'Dub created.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to create dub'
    ),
    ...unauthorizedSchema,
  },
})

export type Createdubbleoute = typeof createDub
