import getUserDetails from '@/actions/auth/user/getUserDetails'
import { auth } from '@/auth'

export default async function useAuth(): Promise<UserWithProfilePic | null> {
  const session = await auth()
  if (!session?.user.id) return null
  return await getUserDetails(session?.user.id!)
}
