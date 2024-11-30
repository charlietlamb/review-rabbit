import { FileAudio, FileImage, FileVideo2 } from 'lucide-react'

export function fileToIcon(extension: string) {
  const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'mkv', 'flv', 'webm']
  if (videoExtensions.includes(extension)) return <FileVideo2 />
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  if (imageExtensions.includes(extension)) return <FileImage />
  return <FileAudio />
}
