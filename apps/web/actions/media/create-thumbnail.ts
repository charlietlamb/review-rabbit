import { getUploadPresignedUrl } from '../s3/upload/get-upload-presigned-url'

export async function createThumbnail(file: File, uuid: string) {
  if (!file.type.includes('video')) return

  const video = document.createElement('video')
  const objectUrl = URL.createObjectURL(file)

  try {
    // Wait for video to load and seek to first frame
    await new Promise<void>((resolve, reject) => {
      video.src = objectUrl
      video.crossOrigin = 'anonymous'
      video.preload = 'metadata'

      video.onloadeddata = () => {
        video.currentTime = 0
      }

      video.onseeked = () => resolve()
      video.onerror = (e) => reject(new Error(`Video loading error: ${e}`))
    })

    // Create canvas and draw video frame
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Canvas context is not available')
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b)
          else reject(new Error('Failed to create blob'))
        },
        'image/webp',
        0.95
      )
    })

    // Create thumbnail file and upload
    const thumbnailFile = new File([blob], `${uuid}.webp`, {
      type: 'image/webp',
      lastModified: Date.now(),
    })

    const presignedUrl = await getUploadPresignedUrl(`thumbnails/${uuid}.webp`)
    if (!presignedUrl) {
      throw new Error('Failed to get presigned URL')
    }

    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: thumbnailFile,
      headers: {
        'Content-Type': 'image/webp',
      },
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error creating thumbnail:', error)
    throw error
  } finally {
    URL.revokeObjectURL(objectUrl)
    video.remove()
  }
}
