import client from '@/client'

export async function getProfilePicUrl(userId: string) {
  const response = await client.s3['get-presigned-url'][':userId'].$get({
    param: { userId },
  })
  const data = await response.json()
  if ('error' in data) {
    return null
  }
  return data.presignedUrl
}
