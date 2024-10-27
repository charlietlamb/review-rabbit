import getUserFromId from '@/actions/auth/user/getUserFromId'
import { auth } from '@/auth'

export default async function useAuth(): Promise<User | null> {
  const session = await auth()
  if (!session?.user.id) return null
  return await getUserFromId(session?.user.id!)
}
