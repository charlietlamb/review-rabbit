import { AppBindings, AppOpenAPI } from '@/src/lib/types'
import { HttpStatusCodes } from '@/src/http'
import { decrypt } from './decrypt'
import { jwtSchema } from '../routes/auth/auth.schema'
import { db } from '../db/postgres'
import { eq } from 'drizzle-orm'
import { users } from '../db/schema'
import { sessions } from '../db/schema'
import { createMiddleware } from 'hono/factory'

export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  //Get JWT
  const body = await c.req.json()
  const encryptedSession = body.session
  if (!encryptedSession) {
    return c.json(
      { error: 'User is not authenticated' },
      HttpStatusCodes.UNAUTHORIZED
    )
  }

  //Decrypt JWT
  const decryptedSession = await decrypt(encryptedSession)
  const payload = decryptedSession.payload
  const parsedDecryptedSession = jwtSchema.parse(payload)
  if (!parsedDecryptedSession) {
    return c.json(
      { error: 'User is not authenticated' },
      HttpStatusCodes.UNAUTHORIZED
    )
  }

  //Get session from db
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, parsedDecryptedSession.id),
  })
  if (!session || session.expiresAt < new Date()) {
    return c.json(
      { error: 'User is not authenticated' },
      HttpStatusCodes.UNAUTHORIZED
    )
  }

  //Get user from db
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
  })
  if (!user) {
    return c.json(
      { error: 'User not found' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  //Return user
  c.set('user', user)
  await next()
})

export default function configureAuth(app: AppOpenAPI) {
  app.use('/auth/*', authMiddleware)
}
