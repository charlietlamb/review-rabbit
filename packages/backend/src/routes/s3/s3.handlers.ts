import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { AppRouteHandler } from '@/src/lib/types'
import { GetPresignedUrlRoute, UploadProfileImageRoute } from './s3.routes'
import env from '@/src/env'
import { HttpStatusCodes } from '@/src/http'
import { db } from '@/src/db/postgres'
import { eq } from 'drizzle-orm'
import { users } from '@/src/db/schema'
import { generatePresignedUrl } from './s3.logic'
import { PresignedUrlResponseError, PresignedUrlResponseOk } from './s3.types'

export const uploadProfileImage: AppRouteHandler<
  UploadProfileImageRoute
> = async (c) => {
  const user = c.get('user')
  // Parse body
  const body = await c.req.json()
  const fileArrayBuffer = Buffer.from(body.file, 'base64')

  // Upload file to S3
  const client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `users/pp/${user.id}/pp.jpg`,
    Body: fileArrayBuffer,
    ACL: 'public-read',
  })

  const response = await client.send(command)
  if (response.$metadata.httpStatusCode !== 200) {
    return c.json(
      { error: 'Failed to upload file' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  // update user imageUploaded to true and imageExpiresAt to null
  await db
    .update(users)
    .set({
      imageUploaded: true,
      imageExpiresAt: null,
    })
    .where(eq(users.id, user.id))

  // Generate presigned URL
  const presignedUrlResponse = await generatePresignedUrl(user, c)

  // Return presigned URL or error
  switch (presignedUrlResponse.status) {
    case HttpStatusCodes.NO_CONTENT:
      return c.json(
        presignedUrlResponse.content as PresignedUrlResponseError['content'],
        HttpStatusCodes.NO_CONTENT
      )
    case HttpStatusCodes.NOT_FOUND:
      return c.json(
        presignedUrlResponse.content as PresignedUrlResponseError['content'],
        HttpStatusCodes.NOT_FOUND
      )
    case HttpStatusCodes.INTERNAL_SERVER_ERROR:
      return c.json(
        presignedUrlResponse.content as PresignedUrlResponseError['content'],
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    default:
      return c.json(
        presignedUrlResponse.content as PresignedUrlResponseOk['content'],
        HttpStatusCodes.OK
      )
  }
}

export const getPresignedUrl: AppRouteHandler<GetPresignedUrlRoute> = async (
  c
) => {
  // Verify user ID
  const userId = c.req.param('userId')

  // Get current user
  const currentUser = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })
  const response = await generatePresignedUrl(currentUser, c)
  switch (response.status) {
    case HttpStatusCodes.NO_CONTENT:
      return c.json(
        response.content as PresignedUrlResponseError['content'],
        HttpStatusCodes.NO_CONTENT
      )
    case HttpStatusCodes.NOT_FOUND:
      return c.json(
        response.content as PresignedUrlResponseError['content'],
        HttpStatusCodes.NOT_FOUND
      )
    case HttpStatusCodes.INTERNAL_SERVER_ERROR:
      return c.json(
        response.content as PresignedUrlResponseError['content'],
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    default:
      return c.json(
        response.content as PresignedUrlResponseOk['content'],
        HttpStatusCodes.OK
      )
  }
}
