import { auth } from '@/backend/auth'
import getUserImage from '@/lib/get-user-image'
import { headers } from 'next/headers'

export default async function useAuth(): Promise<User | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) return null
  session.user.image = await getUserImage(session.user)
  return session.user
}
