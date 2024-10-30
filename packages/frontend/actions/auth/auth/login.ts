'use server'

import { authClient } from '@/authClient'
import { cookies } from 'next/headers'
import { encrypt } from '../jwt/encrypt'

export async function login(email: string, password: string) {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
  })
  if (!data) return { data, error }
  const encryptedSession = await encrypt(data.session)
  const cookieStore = await cookies()
  cookieStore.set('remio.session', encryptedSession, {
    httpOnly: true,
    secure: true,
  })
  return { data, error }
}
