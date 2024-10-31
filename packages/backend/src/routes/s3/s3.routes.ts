import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { HttpStatusCodes } from '@/src/http'

const tags = ['S3']

export const uploadProfileImage = createRoute({
  path: '/auth/s3/upload/profile-image',
  method: 'post',
  summary: 'Upload a profile image to S3',
  tags,
  request: {
    body: {
      description: 'File to upload',
      content: {
        'application/json': {
          schema: z.object({ session: z.string(), file: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        presignedUrl: z.string(),
      }),
      'Presigned URL returned.'
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
  },
})

export type UploadProfileImageRoute = typeof uploadProfileImage

export const getPresignedUrl = createRoute({
  path: '/s3/get/profile-image/:userId',
  method: 'get',
  summary: 'Get a presigned URL for a profile image',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        presignedUrl: z.string(),
      }),
      'Presigned URL returned.'
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
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to upload file'
    ),
  },
})

export type GetPresignedUrlRoute = typeof getPresignedUrl
