import { getAuth } from '@rabbit/auth'
import { User } from '@rabbit/database/schema/auth/users'
import getUserImage from '@rabbit/design-system/lib/misc/get-user-image'
import { headers } from 'next/headers'
import { env } from '@rabbit/env'

export default async function useAuth(): Promise<User | null> {
  const auth = getAuth(env)
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) return null
  session.user.image = await getUserImage(session.user as User)
  return session.user as User
}
