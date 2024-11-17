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
            source: z.string(),
            path: z.string().optional(),
            taskId: z.string(),
            mediaId: z.string(),
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
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to create dub'
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

export type CreateDubRoute = typeof createDub

export const createDubTask = createRoute({
  path: '/dub/task',
  method: 'post',
  summary: 'Create a dub task',
  tags,
  request: {
    body: {
      description: 'Tokens used for the task',
      content: {
        'application/json': {
          schema: z.object({
            tokens: z.number(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        taskId: z.string(),
      }),
      'Dub created.'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to create dub'
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

export type CreateDubTaskRoute = typeof createDubTask
