import { setSessionCookie } from '@/actions/auth/jwt/set-session-cookie'
import { getProfilePicUrl } from '@/actions/auth/user/get-profile-pic-url'
import { decrypt } from '@/backend/src/lib/decrypt'
import client from '@/client'
import { cookies } from 'next/headers'

export default async function useAuth(): Promise<User | null> {
  //get jwt
  const cookieStore = await cookies()
  const encryptedSession = cookieStore.get('remio.session')?.value
  if (!encryptedSession) return null

  //get user
  const response = await client.auth.user.$post({
    json: { session: encryptedSession },
  })
  const user = await response.json()

  if ('error' in user || !user) {
    console.error(user.error)
    cookieStore.delete('remio.session')
    return null
  }

  const userWithDates = {
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }

  //update new jwt with new timeout
  const decryptSession = await decrypt(encryptedSession)
  const session = decryptSession.payload.jti
  if (session) await setSessionCookie(session)

  //return user
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
