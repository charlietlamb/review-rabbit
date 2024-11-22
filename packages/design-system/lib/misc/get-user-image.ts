import { getProfilePicUrl } from '@dubble/design-system/actions/auth/user/get-profile-pic-url'
import type { User } from '@dubble/database/schema/users'

export default async function getUserImage(user: User) {
  if (!user.imageUploaded || !user.imageExpiresAt) return user.image
  if (new Date(user.imageExpiresAt) > new Date()) return user.image
  const presignedUrl = await getProfilePicUrl(user.id)
  return presignedUrl
}
