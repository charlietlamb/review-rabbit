import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { zfd } from 'zod-form-data'
import { uploadProfileImageResponseSchema } from './schema'
import { HttpStatusCodes } from '@/http'

const tags = ['S3']

export const uploadProfileImage = createRoute({
  path: '/s3/upload/profile-image/:userId',
  method: 'post',
  summary: 'Upload a profile image to S3',
  tags,
  request: {
    body: {
      description: 'File to upload',
      content: {
        'multipart/form-data': {
          schema: z.object({
            file: z.instanceof(File),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      uploadProfileImageResponseSchema,
      'File uploaded.'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'User ID is required'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to upload file'
    ),
  },
})

export type UploadProfileImageRoute = typeof uploadProfileImage

export const getPresignedUrl = createRoute({
  path: '/s3/get-presigned-url/:userId',
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
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'User ID is required'
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
