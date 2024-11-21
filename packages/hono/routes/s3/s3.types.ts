export type PresignedUrlResponseOk = {
  content: { presignedUrl: string }
  status: number
}

export type PresignedUrlResponseError = {
  content: { error: string }
  status: number
}
