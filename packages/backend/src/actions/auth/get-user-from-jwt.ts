import { User, users } from '@/src/db/schema/users'

import { eq } from 'drizzle-orm'
import { db } from '@/src/db/postgres'
import { sessions } from '@/src/db/schema/sessions'
import { HttpStatusCodes } from '@/src/http'
import { decrypt } from '@/src/lib/decrypt'
import { jwtSchema } from '@/src/routes/auth/auth.schema'
import { Context } from 'hono'

export default async function getUserFromJwt(
  jwt: string,
  c: Context
): Promise<User | { error: string; code: number }> {
  //Get JWT
  const encryptedSession = jwt
  if (!encryptedSession) {
    return {
      error: 'User is not authenticated',
      code: HttpStatusCodes.UNAUTHORIZED,
    }
  }

  //Decrypt JWT
  const decryptedSession = await decrypt(encryptedSession)
  const payload = decryptedSession.payload
  const parsedDecryptedSession = jwtSchema.parse(payload)
  if (!parsedDecryptedSession) {
    return {
      error: 'User is not authenticated',
      code: HttpStatusCodes.UNAUTHORIZED,
    }
  }

  //Get session from db
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, parsedDecryptedSession.id),
  })
  if (!session || session.expiresAt < new Date()) {
    return {
      error: 'User is not authenticated',
      code: HttpStatusCodes.UNAUTHORIZED,
    }
  }

  //Get user from db
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
  })
  if (!user) {
    return {
      error: 'User not found',
      code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  }
  return user
}
