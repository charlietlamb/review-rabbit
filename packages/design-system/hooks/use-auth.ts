import { getAuth } from '@rabbit/auth'
import { User } from '@rabbit/database/schema/auth/users'
import getUserImage from '@rabbit/design-system/lib/misc/get-user-image'
import { headers } from 'next/headers'
import { env } from '@rabbit/env'

export default async function useAuth(): Promise<User | null> {
  const auth = getAuth(env)
  const headersList = await headers()
  console.log('headersList', headersList)
  const session = await auth.api.getSession({
    headers: headersList,
  })
  console.log('session', session)
  if (!session) return null
  session.user.image = await getUserImage(session.user as User)
  return session.user as User
}
