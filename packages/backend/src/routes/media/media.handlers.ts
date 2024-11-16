import { S3Client } from '@aws-sdk/client-s3'
import { AppRouteHandler } from '@/src/lib/types'
import env from '@/src/env'
import { HttpStatusCodes } from '@/src/http'
import { UploadMediaRoute } from './media.routes'
import { uploadMediaFromFile } from './media.logic'

export const uploadMedia: AppRouteHandler<UploadMediaRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const body = await c.req.json()
  const files = body.files
  console.log('-------')
  console.log(files.map((file) => file.duration))
  console.log('-------')
  const filesWithExtension = files.map(
    (file: { arrayBuffer: string; name: string }) => {
      const arrayBuffer = Buffer.from(file.arrayBuffer, 'base64')
      const name = file.name
      const extension = name.split('.').pop()
      return { arrayBuffer, name, extension }
    }
  )

  // Upload file to S3
  const client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const tasks = filesWithExtension.map((file) => {
    return uploadMediaFromFile(file, client)
  })

  const uploadResponses: string[] = await Promise.all(tasks)

  return c.json(filesWithExtension, HttpStatusCodes.OK)
}
