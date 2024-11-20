import { FileAudio, FileVideo2 } from 'lucide-react'

export function fileToIcon(extension: string) {
  const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'mkv', 'flv', 'webm']
  if (videoExtensions.includes(extension)) return <FileVideo2 />
  return <FileAudio />
}
