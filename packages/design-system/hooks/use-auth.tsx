import { auth } from '@ff/auth'
import { User } from '@ff/database/schema/users'
import getUserImage from '@ff/design-system/lib/misc/get-user-image'
import { headers } from 'next/headers'

export default async function useAuth(): Promise<User | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) return null
  session.user.image = await getUserImage(session.user as User)
  return session.user as User
}
