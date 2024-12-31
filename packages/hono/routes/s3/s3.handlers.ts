import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { AppRouteHandler } from '@rabbit/hono/lib/types'
import {
  GetPresignedUrlRoute,
  GetProfileImagePresignedUrlRoute,
  GetUploadPresignedUrlRoute,
  UploadProfileImageRoute,
} from '@rabbit/hono/routes/s3/s3.routes'
import { getEnv } from '@rabbit/env'
import { HttpStatusCodes } from '@rabbit/http'
import { db } from '@rabbit/database'
import { eq } from 'drizzle-orm'
import { users } from '@rabbit/database/schema'
import {
  generatePresignedUrlUserImage,
  PresignedUrlErrorCodes,
} from '@rabbit/hono/routes/s3/s3.logic'
import {
  PresignedUrlResponseError,
  PresignedUrlResponseOk,
} from '@rabbit/hono/routes/s3/s3.types'
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
    region: getEnv().AWS_REGION,
    credentials: {
      accessKeyId: getEnv().AWS_ACCESS_KEY_ID,
      secretAccessKey: getEnv().AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new GetObjectCommand({
    Bucket: getEnv().AWS_S3_BUCKET_NAME,
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
    region: getEnv().AWS_REGION,
    credentials: {
      accessKeyId: getEnv().AWS_ACCESS_KEY_ID,
      secretAccessKey: getEnv().AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new PutObjectCommand({
    Bucket: getEnv().AWS_S3_BUCKET_NAME,
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
