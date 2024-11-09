import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { AppRouteHandler } from '@/src/lib/types'
import { GetPresignedUrlRoute, UploadProfileImageRoute } from './s3.routes'
import env from '@/src/env'
import { HttpStatusCodes } from '@/src/http'
import { db } from '@/src/db/postgres'
import { eq } from 'drizzle-orm'
import { users } from '@/src/db/schema'
import { generatePresignedUrl, PresignedUrlErrorCodes } from './s3.logic'
import { PresignedUrlResponseError, PresignedUrlResponseOk } from './s3.types'

export const uploadProfileImage: AppRouteHandler<
  UploadProfileImageRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
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

  const uploadResponse = await client.send(command)
  if (uploadResponse.$metadata.httpStatusCode !== 200) {
    return c.json(
      { error: 'Failed to upload file' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  const response = await generatePresignedUrl(user)
  if (response.status === HttpStatusCodes.OK) {
    return c.json(
      response.content as PresignedUrlResponseOk['content'],
      HttpStatusCodes.OK
    )
  } else {
    return c.json(
      response.content as PresignedUrlResponseError['content'],
      response.status as PresignedUrlErrorCodes
    )
  }
}

export const getPresignedUrl: AppRouteHandler<GetPresignedUrlRoute> = async (
  c
) => {
  // Verify user ID
  const userId = c.req.param('userId')

  // Get current user
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })
  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }

  const response = await generatePresignedUrl(user)
  if (response.status === HttpStatusCodes.OK) {
    return c.json(
      response.content as PresignedUrlResponseOk['content'],
      HttpStatusCodes.OK
    )
  } else {
    return c.json(
      response.content as PresignedUrlResponseError['content'],
      response.status as PresignedUrlErrorCodes
    )
  }
}
