import { getUploadPresignedUrl } from './get-upload-presigned-url'
import { uploadProfilePicture } from './upload-profile-picture'

export async function uploadProfilePictureClient(user: User, file: File) {
  const path = `users/pp/${user.id}/pp.jpg`
  const presignedUrl = await getUploadPresignedUrl(path)
  if (!presignedUrl) return 500
  await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
  })

  const res = await uploadProfilePicture(path)
  return res
}
