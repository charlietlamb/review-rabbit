import { AcceptedMimeType } from 'data/file-types'

export default async function validateUrl(
  url: string,
  mediaTypes: AcceptedMimeType[]
): Promise<boolean> {
  if (!url) return false

  try {
    const parsedUrl = new URL(url)

    // Common file extensions map
    const extensionMap: Record<AcceptedMimeType, string[]> = {
      audio: ['.mp3', '.wav', '.ogg', '.m4a', '.aac'],
      video: ['.mp4', '.mov', '.avi', '.webm', '.mkv'],
      image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    }

    // Check file extensions first
    const validExtensions = mediaTypes.flatMap((type) => extensionMap[type])
    if (validExtensions.some((ext) => url.toLowerCase().endsWith(ext))) {
      return true
    }

    // First try HEAD request with a timeout
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const response = await fetch(parsedUrl, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          Accept: mediaTypes.map((type) => `${type}/*`).join(','),
        },
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (!contentType) return false

        const baseContentType = contentType.split(';')[0].trim().toLowerCase()
        return mediaTypes.some(
          (type) =>
            baseContentType.startsWith(`${type}/`) ||
            (type === 'video' && baseContentType === 'application/x-mpegurl') ||
            baseContentType === 'application/octet-stream'
        )
      }
    } catch {
      // If HEAD fails, try GET with range header to minimize data transfer
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(parsedUrl, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          Range: 'bytes=0-0',
          Accept: mediaTypes.map((type) => `${type}/*`).join(','),
        },
      })

      clearTimeout(timeoutId)

      if (response.ok || response.status === 206) {
        const contentType = response.headers.get('content-type')
        if (!contentType) return false

        const baseContentType = contentType.split(';')[0].trim().toLowerCase()
        return mediaTypes.some(
          (type) =>
            baseContentType.startsWith(`${type}/`) ||
            (type === 'video' && baseContentType === 'application/x-mpegurl') ||
            baseContentType === 'application/octet-stream'
        )
      }
    }

    return false
  } catch {
    return false
  }
}
