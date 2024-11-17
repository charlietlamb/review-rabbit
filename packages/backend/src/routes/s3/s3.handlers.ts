import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { AppRouteHandler } from '@/src/lib/types'
import {
  DeleteMediaRoute,
  GetPresignedUrlRoute,
  GetUploadPresignedUrlRoute,
  UploadProfileImageRoute,
} from './s3.routes'
import env from '@/src/env'
import { HttpStatusCodes } from '@/src/http'
import { db } from '@/src/db/postgres'
import { eq } from 'drizzle-orm'
import { media, users } from '@/src/db/schema'
import { generatePresignedUrl, PresignedUrlErrorCodes } from './s3.logic'
import { PresignedUrlResponseError, PresignedUrlResponseOk } from './s3.types'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { User } from 'better-auth'

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

  const response = await generatePresignedUrl(user as User)
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
  const file: { fileId: string; extension: string } = body
  const client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `media/${file.fileId}.${file.extension}`,
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
  console.log(deleteResponse)
  if (
    deleteResponse.$metadata.httpStatusCode !== 200 &&
    deleteResponse.$metadata.httpStatusCode !== 204
  ) {
    return c.json(
      { error: 'Failed to delete media file' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
  console.log(id)
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
