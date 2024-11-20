import client from '@/client'

export async function getProfilePicUrl(userId: string): Promise<string> {
  const response = await client.s3.get['profile-image'][':userId'].$get({
    param: { userId },
  })
  const data = await response.json()
  if ('error' in data) {
    throw new Error(data.error)
  }
  return data.presignedUrl
}
