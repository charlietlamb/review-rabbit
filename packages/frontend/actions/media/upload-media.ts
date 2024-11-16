import { v4 as uuidv4 } from 'uuid'
import { getUploadPresignedUrl } from '@/actions/s3/upload/get-upload-presigned-url'
import { storeMedia } from './store-media'

export async function uploadMedia(
  files: File[],
  durations: Record<string, number>
): Promise<number> {
  for (const file of files) {
    const uuid = uuidv4()
    const extension = file.name.split('.').pop() ?? file.type.split('/')[1]
    const presignedUrl = await getUploadPresignedUrl(uuid, extension)
    if (!presignedUrl) return 500
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
    })
    if (response.status !== 200) return response.status
    const res = await storeMedia(file, uuid, extension, durations[file.name])
    return res
  }
  return 200
}
