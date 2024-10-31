import { getProfilePicUrl } from '@/actions/auth/user/getProfilePicUrl'
import client from '@/client'
import { cookies } from 'next/headers'

export default async function useAuth(): Promise<User | null> {
  const cookieStore = await cookies()
  const encryptedSession = cookieStore.get('remio.session')?.value
  if (!encryptedSession) return null
  const response = await client.auth.user.$post({
    json: { session: encryptedSession },
  })
  const user = await response.json()

  if ('error' in user) {
    console.error(user.error)
    return null
  }
  if (!user) return null
  const userWithDates = {
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }

  if (
    !userWithDates.imageUploaded ||
    new Date(userWithDates.imageExpiresAt ?? '') < new Date()
  ) {
    return userWithDates as User
  } else {
    const profilePicUrl = await getProfilePicUrl(userWithDates.id)
    userWithDates.image = profilePicUrl
    return userWithDates as User
  }
}
