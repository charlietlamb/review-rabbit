'use server'

import { authClient } from '@/authClient'
import { cookies } from 'next/headers'
import { encrypt } from '../jwt/encrypt'

export async function login(email: string, password: string) {
  const response = await authClient.signIn.email({
    email,
    password,
  })
  if (response.error) return response.error.status

  const encryptedSession = await encrypt(response.data.session)
  const cookieStore = await cookies()
  cookieStore.set('remio.session', encryptedSession, {
    httpOnly: true,
    secure: true,
  })
  return 200
}
