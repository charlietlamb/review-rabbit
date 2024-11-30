export const isVideo = (extension: string) =>
  extension === 'mp4' || extension === 'webm' || extension === 'mov'

export const isAudio = (extension: string) =>
  extension === 'mp3' || extension === 'wav' || extension === 'm4a'

export const isImage = (extension: string) =>
  extension === 'jpg' ||
  extension === 'jpeg' ||
  extension === 'png' ||
  extension === 'gif' ||
  extension === 'webp'
