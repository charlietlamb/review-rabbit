import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { AppRouteHandler } from '@/lib/types'
import { GetPresignedUrlRoute, UploadProfileImageRoute } from './s3.routes'
import env from '@/env'
import { HttpStatusCodes } from '@/http'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { z } from 'zod'
import { db } from '@/db/postgres'
import { eq } from 'drizzle-orm'
import { presignedUrls, users } from '@/db/schema'

export const uploadProfileImage: AppRouteHandler<
  UploadProfileImageRoute
> = async (c) => {
  // Parse body
  const body = await c.req.parseBody()
  const file = body.file as File
  const fileArrayBuffer = await file.arrayBuffer()

  // Get user ID
  const userId = c.req.param('userId')

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
    Key: `users/pp/${userId}/pp.jpg`,
    // Key: env.AWS_SECRET_ACCESS_KEY,
    Body: Buffer.from(fileArrayBuffer),
    ACL: 'public-read',
  })
  const response = await client.send(command)
  if (response.$metadata.httpStatusCode !== 200) {
    return c.json(
      { error: 'Failed to upload file' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  // Update user imageUploaded to true
  await db
    .update(users)
    .set({ imageUploaded: true })
    .where(eq(users.id, userId))

  // Remove current presigned URL
  await db.delete(presignedUrls).where(eq(presignedUrls.userId, userId))

  // Return success
  return c.json(
    { status: response.$metadata.httpStatusCode, message: 'File uploaded' },
    HttpStatusCodes.OK
  )
}

export const getPresignedUrl: AppRouteHandler<GetPresignedUrlRoute> = async (
  c
) => {
  // Verify user ID
  const userId = c.req.param('userId')
  const uuidSchema = z.string().uuid()
  const parsedUserId = uuidSchema.parse(userId)
  if (!parsedUserId) {
    return c.json({ error: 'Invalid user ID' }, HttpStatusCodes.BAD_REQUEST)
  }

  // Get current presigned URL
  const currentPresignedUrl = await db.query.presignedUrls.findFirst({
    where: eq(presignedUrls.userId, parsedUserId),
  })
  if (currentPresignedUrl && currentPresignedUrl.expires > new Date()) {
    return c.json({ presignedUrl: currentPresignedUrl.url }, HttpStatusCodes.OK)
  }

  // Get current user
  const currentUser = await db.query.users.findFirst({
    where: eq(users.id, parsedUserId),
  })

  if (!currentUser) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }

  if (!currentUser.imageUploaded) {
    return c.json(
      { error: 'User image not uploaded' },
      HttpStatusCodes.NO_CONTENT
    )
  }

  // Generate new presigned URL
  const client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `users/pp/${userId}/pp.jpg`,
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

  // Save new presigned URL
  await db
    .update(presignedUrls)
    .set({
      userId: parsedUserId,
      url: presignedUrl,
      expires: new Date(Date.now() + 60 * 60 * 24),
      updated_at: new Date(),
    })
    .where(eq(presignedUrls.userId, parsedUserId))

  return c.json({ presignedUrl }, HttpStatusCodes.OK)
}
