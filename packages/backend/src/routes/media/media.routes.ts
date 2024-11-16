import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { HttpStatusCodes } from '@/src/http'
import { unauthorizedSchema } from '@/src/lib/configure-auth'

const tags = ['Media']

export const uploadMedia = createRoute({
  path: '/media/upload',
  method: 'post',
  summary: 'Upload media',
  tags,
  request: {
    body: {
      description: 'File to upload',
      content: {
        'application/json': {
          schema: z.object({
            files: z.array(
              z.object({
                name: z.string(),
                size: z.number(),
                duration: z.number(),
                arrayBuffer: z.string(),
              })
            ),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      ),
      'Media uploaded.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to upload file'
    ),
    ...unauthorizedSchema,
  },
})

export type UploadMediaRoute = typeof uploadMedia
