import { users } from '@rabbit/database/schema/auth/users'
import {
  type PresignedUrlResponseError,
  type PresignedUrlResponseOk,
} from '@rabbit/hono/routes/s3/s3.types'
import { HttpStatusCodes } from '@rabbit/http'
import { EnvType } from '@rabbit/env'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getDb } from '@rabbit/database'
import { eq } from 'drizzle-orm'
import { User } from 'better-auth/types'

export async function generatePresignedUrlUserImage(
  user: User | undefined,
  env: EnvType
): Promise<PresignedUrlResponseOk | PresignedUrlResponseError> {
  if (!user) {
    return {
      content: { error: 'User not found' },
      status: HttpStatusCodes.NOT_FOUND,
    }
  }

  if (!user.image && !user.imageUploaded) {
    return {
      content: { error: 'User image not uploaded' },
      status: HttpStatusCodes.NO_CONTENT,
    }
  }
  if (
    (!!user.image &&
      !!user?.imageExpiresAt &&
      new Date(user.imageExpiresAt) > new Date()) ??
    true
  ) {
    return {
      content: { presignedUrl: user.image! },
      status: HttpStatusCodes.OK,
    }
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
    Key: `users/pp/${user.id}/pp.jpg`,
  })

  const presignedUrl = await getSignedUrl(client, command, {
    expiresIn: 60 * 60 * 24,
  })

  if (!presignedUrl) {
    return {
      content: { error: 'Failed to get presigned URL' },
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  }

  const db = getDb(env)

  // Save new presigned URL
  await db
    .update(users)
    .set({
      image: presignedUrl,
      imageUploaded: true,
      imageExpiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000),
    })
    .where(eq(users.id, user.id))

  return {
    content: { presignedUrl },
    status: HttpStatusCodes.OK,
  }
}

export const responseCodes = [
  HttpStatusCodes.NO_CONTENT,
  HttpStatusCodes.NOT_FOUND,
  HttpStatusCodes.INTERNAL_SERVER_ERROR,
] as const

export type PresignedUrlErrorCodes = (typeof responseCodes)[number]

export async function generatePresignedUrlFromPath(
  path: string
): Promise<PresignedUrlResponseOk | PresignedUrlResponseError> {
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
    Key: path,
  })

  const presignedUrl = await getSignedUrl(client, command, {
    expiresIn: 60 * 60 * 24,
  })

  if (!presignedUrl) {
    return {
      content: { error: 'Failed to get presigned URL' },
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  }

  return {
    content: { presignedUrl },
    status: HttpStatusCodes.OK,
  }
}
