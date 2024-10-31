import client from '@/client'

export async function getProfilePicUrl(userId: string): Promise<string | null> {
  const response = await client.s3.get['profile-image'][':userId'].$get({
    param: { userId },
  })
  const data = await response.json()
  console.log(data)
  if ('error' in data) {
    return null
  }
  return data.presignedUrl
}
