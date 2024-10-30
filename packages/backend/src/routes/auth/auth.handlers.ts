import { AppRouteHandler } from '@/src/lib/types'
import { HttpStatusCodes } from '@/src/http'
import { UserRoute } from './auth.routes'
import { decrypt } from '@/src/lib/decrypt'
import { sessions } from '@/src/db/schema/sessions'
import { eq } from 'drizzle-orm'
import { db } from '@/src/db/postgres'
import { users } from '@/src/db/schema/users'
import { jwtSchema } from './auth.schema'

export function signInAction(method: string, formData?: { email: string }) {}

export const user: AppRouteHandler<UserRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }
  return c.json(user, HttpStatusCodes.OK)
}
