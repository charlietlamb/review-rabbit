import client from '@/client'

export async function uploadProfilePicture(form: {
  userId: string
  file: File
}): Promise<number> {
  const response = await client.s3.upload['profile-image'][':userId'].$post({
    param: { userId: form.userId },
    form: {
      file: form.file,
    },
  })
  return response.status
}
