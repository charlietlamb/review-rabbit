import { getProfilePicUrl } from '@/actions/auth/user/getProfilePicUrl'
import getUserFromId from '@/actions/auth/user/getUserFromId'

export default async function getUserDetails(
  id: string
): Promise<UserWithProfilePic | null> {
  const user = await getUserFromId(id)
  if (!user) return null
  const presignedUrl = await getProfilePicUrl(id)
  return { ...user, profilePicUrl: presignedUrl }
}
