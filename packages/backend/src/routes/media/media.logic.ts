import { v4 as uuidv4 } from 'uuid'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { env } from 'bun'
import { media } from '@/src/db/schema/media'
import { db } from '@/src/db/postgres'

export async function uploadMediaFromFile(
  file: {
    name: string
    extension: string
    arrayBuffer: string
  },
  client: S3Client
): Promise<string> {
  const fileId = uuidv4()
  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `media/${fileId}.${file.extension}`,
    Body: file.arrayBuffer,
    ACL: 'public-read',
  })
  await client.send(command)
  return fileId
}

export async function storeMedia(
  files: {
    fileId: string
    name: string
    extension: string
  }[],
  userId: string
): Promise<void> {
  await db.insert(media).values(
    files.map((file) => ({
      id: file.fileId,
      name: file.name,
      pathId: file.fileId,
    }))
  )
}
