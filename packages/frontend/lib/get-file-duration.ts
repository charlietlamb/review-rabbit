export function getFileDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const mediaElement = document.createElement(
      file.type.startsWith('audio') ? 'audio' : 'video'
    )

    mediaElement.src = url
    mediaElement.addEventListener('loadedmetadata', () => {
      resolve(mediaElement.duration)
      URL.revokeObjectURL(url)
    })

    mediaElement.addEventListener('error', () => {
      reject(new Error('Failed to load media metadata'))
      URL.revokeObjectURL(url)
    })
  })
}
