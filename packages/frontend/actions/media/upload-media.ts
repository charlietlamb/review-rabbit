import { v4 as uuidv4 } from 'uuid'
import { getUploadPresignedUrl } from '@/actions/s3/upload/get-upload-presigned-url'
import { storeMedia } from './store-media'

export async function uploadMedia(
  files: File[],
  durations: Record<string, number>
): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    const uuid = uuidv4()
    const extension = file.name.split('.').pop() ?? file.type.split('/')[1]
    const presignedUrl = await getUploadPresignedUrl(uuid, extension)
    if (!presignedUrl) return null
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
    })
    if (response.status !== 200) {
      throw new Error('Failed to upload file')
    }
    return await storeMedia(file, uuid, extension, durations[file.name])
  })

  const results = await Promise.all(uploadPromises)
  return results.filter((id) => id !== null)
}
