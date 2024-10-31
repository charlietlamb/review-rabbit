'use server'

import { authClient } from '@/authClient'

export async function signup(name: string, email: string, password: string) {
  return await authClient.signUp.email({
    name,
    email,
    password,
    // callbackURL: `${env.NEXT_PUBLIC_LOCATION}/dashboard`,
  })
}
