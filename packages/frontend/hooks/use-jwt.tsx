import { cookies } from 'next/headers'

export default async function useJwt() {
  const cookieStore = await cookies()
  const encryptedSession = cookieStore.get('remio.session')?.value
  if (!encryptedSession) return null
  return encryptedSession
}
