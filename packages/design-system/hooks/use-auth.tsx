import { authClient } from '@dubble/auth'
import { User } from '@dubble/database/schema/users'
import getUserImage from '@dubble/design-system/lib/misc/get-user-image'
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
  session.user.image = await getUserImage(session.user as User)
  return session.user as User
}
