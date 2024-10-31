import env from '../env'
import { jwtVerify } from 'jose'

export async function decrypt(token: string) {
  const secret = new TextEncoder().encode(env.BETTER_AUTH_SECRET)
  return await jwtVerify(token, secret, { algorithms: ['HS256'] })
}
