import { User, users } from '@/src/db/schema/users'
import { type Context } from 'hono'
import {
  type PresignedUrlResponseError,
  type PresignedUrlResponseOk,
} from './s3.types'
import { HttpStatusCodes } from '@/src/http'
import env from '@/src/env'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { db } from '@/src/db/postgres'
import { eq } from 'drizzle-orm'

export async function generatePresignedUrl(
  user: User | undefined,
  c: Context
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
      user.imageExpiresAt < new Date()) ??
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

  // Save new presigned URL
  await db
    .update(users)
    .set({
      image: presignedUrl,
      imageExpiresAt: new Date(Date.now() + 60 * 60 * 24),
    })
    .where(eq(users.id, user.id))

  return {
    content: { presignedUrl },
    status: HttpStatusCodes.OK,
  }
}
