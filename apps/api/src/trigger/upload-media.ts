import { logger, task } from '@trigger.dev/sdk/v3'
import env from '../env'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

export const uploadMediaTask = task({
  id: 'upload-media',
  run: async (payload: { file: string }, { ctx }) => {
    logger.log('Uploading media!', { payload, ctx })
    const fileId = uuidv4()

    const client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    })

    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: `media/${fileId}`,
      Body: payload.file,
      ACL: 'public-read',
    })

    const uploadResponse = await client.send(command)
    if (uploadResponse.$metadata.httpStatusCode !== 200) {
      return {
        error: 'Failed to upload file',
      }
    }

    return {
      fileId,
    }
  },
})
