import { authClient } from '@/authClient'
import getUserImage from '@/lib/get-user-image'
import { headers } from 'next/headers'

export default async function useAuth(): Promise<User | null> {
  const response = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })
  if (response.error) return null
  const session = response.data
  if (!session) return null
  session.user.image = await getUserImage(session.user)
  return session.user
}
