import { Media } from '@remio/database'

export async function downloadMedia(media: Media): Promise<void> {
  try {
    // Get the URL from the media object
    const url = media.url

    // Fetch the file content
    const response = await fetch(url)
    if (!response.ok) throw new Error('Download failed')

    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)

    // Create and trigger download
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = media.name || 'download'
    document.body.appendChild(a)
    a.click()

    // Cleanup
    document.body.removeChild(a)
    URL.revokeObjectURL(objectUrl)
  } catch (error) {
    console.error('Failed to download media:', error)
    throw error
  }
}
