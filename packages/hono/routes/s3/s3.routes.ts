import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { HttpStatusCodes } from '@remio/http'
import { unauthorizedSchema } from '@remio/hono/lib/configure-auth'

const tags = ['S3']

export const uploadProfileImage = createRoute({
  path: '/s3/upload/profile-image',
  method: 'post',
  summary: 'Upload a profile image to S3',
  tags,
  request: {
    body: {
      description: 'Path of the uploaded file',
      content: {
        'application/json': {
          schema: z.object({ path: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        presignedUrl: z.string(),
      }),
      'Image uploaded.'
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

export type UploadProfileImageRoute = typeof uploadProfileImage

export const getProfileImagePresignedUrl = createRoute({
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

export type GetProfileImagePresignedUrlRoute =
  typeof getProfileImagePresignedUrl

export const getPresignedUrl = createRoute({
  path: '/s3/get/presigned-url',
  method: 'post',
  summary: 'Get a presigned URL for a file upload',
  tags,
  request: {
    body: {
      description: 'File to upload',
      content: {
        'application/json': {
          schema: z.object({
            key: z.string(),
          }),
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
      'Failed to get presigned URL'
    ),
    ...unauthorizedSchema,
  },
})

export type GetPresignedUrlRoute = typeof getPresignedUrl

export const getUploadPresignedUrl = createRoute({
  path: '/s3/get/upload-presigned-url',
  method: 'post',
  summary: 'Get a presigned URL for a file upload',
  tags,
  request: {
    body: {
      description: 'File to upload',
      content: {
        'application/json': {
          schema: z.object({
            key: z.string(),
          }),
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
      'Failed to get presigned URL'
    ),
    ...unauthorizedSchema,
  },
})

export type GetUploadPresignedUrlRoute = typeof getUploadPresignedUrl

export const deleteMedia = createRoute({
  path: '/s3/media/delete',
  method: 'post',
  summary: 'Delete a media file',
  tags,
  request: {
    body: {
      description: 'Path of the media file to delete',
      content: {
        'application/json': {
          schema: z.object({
            path: z.string(),
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Media file deleted.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete media file'
    ),
    ...unauthorizedSchema,
  },
})

export type DeleteMediaRoute = typeof deleteMedia
