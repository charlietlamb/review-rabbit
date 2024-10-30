import env from '@/env'
import { SignJWT } from 'jose'

const secret = new TextEncoder().encode(env.BETTER_AUTH_SECRET)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret)
}
