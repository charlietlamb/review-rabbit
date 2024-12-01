import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { HttpStatusCodes } from '@ff/http'
import { unauthorizedSchema } from '@ff/hono/lib/configure-auth'
import { selectMediaSchema } from '@ff/database/schema/media'

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
            mimeType: z.string(),
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

export const fetchMedia = createRoute({
  path: '/media/get',
  method: 'post',
  summary: 'Fetch media files',
  tags,
  request: {
    body: {
      description: 'Source to fetch media files from',
      content: {
        'application/json': {
          schema: z.object({
            offset: z.number(),
            limit: z.number(),
            source: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectMediaSchema),
      'Media files fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch media'
    ),
    ...unauthorizedSchema,
  },
})

export type FetchMediaRoute = typeof fetchMedia

export const fetchMediaBatch = createRoute({
  path: '/media/batch',
  method: 'post',
  summary: 'Fetch media files',
  tags,
  request: {
    body: {
      description: 'IDs of media files to fetch',
      content: {
        'application/json': {
          schema: z.object({
            ids: z.array(z.string()),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectMediaSchema),
      'Media files fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch media'
    ),
    ...unauthorizedSchema,
  },
})

export type FetchMediaBatchRoute = typeof fetchMediaBatch
