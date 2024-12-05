import { v4 as uuidv4 } from 'uuid'
import { getUploadPresignedUrl } from '@remio/design-system/actions/s3/upload/get-upload-presigned-url'
import { storeMedia } from './store-media'
import { createThumbnail } from './create-thumbnail'
import { Dispatch, SetStateAction } from 'react'

type ProgressCallback = (fileName: string, progress: number) => void

export async function uploadMedia(
  files: File[],
  durations: Record<string, number>,
  setProgress: Dispatch<SetStateAction<Record<string, number>>>
): Promise<string[] | null> {
  // Create a stable callback that won't trigger React warnings
  const updateProgress: ProgressCallback = (
    fileName: string,
    progress: number
  ) => {
    // Use requestAnimationFrame to avoid React state updates during render
    requestAnimationFrame(() => {
      setProgress((prev) => ({
        ...prev,
        [fileName]: progress,
      }))
    })
  }

  const uploadPromises = files.map(async (file) => {
    try {
      const uuid = uuidv4()
      const extension = file.name.split('.').pop() ?? file.type.split('/')[1]
      const presignedUrl = await getUploadPresignedUrl(
        `media/${uuid}.${extension}`
      )
      console.log('presignedUrl', presignedUrl)
      if (!presignedUrl) {
        console.error('Failed to get presigned URL')
        return null
      }

      // Use XMLHttpRequest for better upload control and progress monitoring
      const mediaId = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', presignedUrl)
        xhr.setRequestHeader('Content-Type', file.type)

        xhr.onload = async () => {
          if (xhr.status === 200) {
            try {
              await createThumbnail(file, uuid)
              const mediaId = await storeMedia(
                file,
                uuid,
                extension,
                durations[file.name]
              )
              if (!mediaId) {
                reject(new Error('Failed to store media'))
                return
              }
              // Set final progress
              updateProgress(file.name, 100)
              resolve(mediaId)
            } catch (error) {
              console.error('Error processing uploaded file:', error)
              reject(error)
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`))
          }
        }

        xhr.onerror = () => reject(new Error('Upload failed'))

        // Throttle progress updates using requestAnimationFrame
        let ticking = false
        xhr.upload.onprogress = (event) => {
          if (!ticking && event.lengthComputable) {
            ticking = true
            requestAnimationFrame(() => {
              const percentComplete = (event.loaded / event.total) * 100
              updateProgress(file.name, Math.round(percentComplete))
              ticking = false
            })
          }
        }

        xhr.send(file)
      })

      return mediaId
    } catch (error) {
      console.error('Error in upload process:', error)
      return null
    }
  })

  const results = await Promise.all(uploadPromises)
  return results.filter((id): id is string => id !== null)
}
