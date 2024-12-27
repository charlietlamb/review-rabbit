import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { AppRouteHandler } from '@burse/hono/lib/types'
import {
  DeleteMediaRoute,
  GetPresignedUrlRoute,
  GetProfileImagePresignedUrlRoute,
  GetUploadPresignedUrlRoute,
  UploadProfileImageRoute,
} from '@burse/hono/routes/s3/s3.routes'
import { env } from '@burse/env'
import { HttpStatusCodes } from '@burse/http'
import { db } from '@burse/database'
import { eq } from 'drizzle-orm'
import { media, users } from '@burse/database/schema'
import {
  generatePresignedUrlUserImage,
  PresignedUrlErrorCodes,
} from '@burse/hono/routes/s3/s3.logic'
import {
  PresignedUrlResponseError,
  PresignedUrlResponseOk,
} from '@burse/hono/routes/s3/s3.types'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { User } from 'better-auth'

export const uploadProfileImage: AppRouteHandler<
  UploadProfileImageRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  await db
    .update(users)
    .set({
      imageUploaded: true,
    })
    .where(eq(users.id, user.id))

  const response = await generatePresignedUrlUserImage(user as User)
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
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const body = await c.req.json()
  const key = body.key
  const client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
  })

  const presignedUrl = await getSignedUrl(client, command, {
    expiresIn: 60 * 60 * 24,
  })
  if (!presignedUrl) {
    return c.json(
      { error: 'Failed to get presigned URL' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
  return c.json({ presignedUrl }, HttpStatusCodes.OK)
}

export const getProfileImagePresignedUrl: AppRouteHandler<
  GetProfileImagePresignedUrlRoute
> = async (c) => {
  // Verify user ID
  const userId = c.req.param('userId')

  // Get current user
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })
  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }

  const response = await generatePresignedUrlUserImage(user as User)
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

export const getUploadPresignedUrl: AppRouteHandler<
  GetUploadPresignedUrlRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const body = await c.req.json()
  const key = body.key
  const client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
  })

  const presignedUrl = await getSignedUrl(client, command, {
    expiresIn: 60 * 60 * 24,
  })
  if (!presignedUrl) {
    return c.json(
      { error: 'Failed to get presigned URL' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
  return c.json({ presignedUrl }, HttpStatusCodes.OK)
}

export const deleteMedia: AppRouteHandler<DeleteMediaRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const body = await c.req.json()
  const { path, id } = body
  const client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new DeleteObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: path,
  })
  const deleteResponse = await client.send(command)
  if (
    deleteResponse.$metadata.httpStatusCode !== 200 &&
    deleteResponse.$metadata.httpStatusCode !== 204
  ) {
    return c.json(
      { error: 'Failed to delete media file' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
  try {
    await db.delete(media).where(eq(media.id, id))
  } catch (e) {
    console.error(e)
    return c.json(
      { error: 'Failed to delete media from database' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  return c.json({ success: true }, HttpStatusCodes.OK)
}
