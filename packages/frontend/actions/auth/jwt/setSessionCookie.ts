'use server'

import { cookies } from 'next/headers'
import { encrypt } from './encrypt'

export async function setSessionCookie(session: string) {
  const newSession = await encrypt(session)
  const cookieStore = await cookies()
  if (cookieStore.get('remio.session')) {
    cookieStore.delete('remio.session')
  }
  cookieStore.set('remio.session', newSession)
}
