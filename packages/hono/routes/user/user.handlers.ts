import {
  GetAccountRoute,
  GetUserRoute,
  ResetPasswordRoute,
  UpdateUserRoute,
} from '@rabbit/hono/routes/user/user.routes'
import { AppRouteHandler } from '@rabbit/hono/lib/types'
import { getDb } from '@rabbit/database'
import { and, eq } from 'drizzle-orm'
import { users } from '@rabbit/database/schema/auth/users'
import { updateUserSchema } from '@rabbit/hono/routes/user/user.schema'
import { HttpStatusCodes } from '@rabbit/http'
import { verifications } from '@rabbit/database/schema/auth/verifications'
import { hashPassword } from '@rabbit/hono/lib/password'
import { accounts } from '@rabbit/database/schema'

export const get: AppRouteHandler<GetUserRoute> = async (c) => {
  const userId = c.req.param('userId')
  if (!userId) {
    return c.json({ error: 'User ID is required' }, HttpStatusCodes.BAD_REQUEST)
  }
  const db = getDb(c.env)
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })

  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }

  return c.json(user, HttpStatusCodes.OK)
}

export const update: AppRouteHandler<UpdateUserRoute> = async (c) => {
  const authUser = await c.get('user')
  if (!authUser) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const db = getDb(c.env)
  const body = await c.req.json()
  const data = updateUserSchema.parse(body)
  if (!data) {
    return c.json({ error: 'Incorrect body sent' }, HttpStatusCodes.BAD_REQUEST)
  }

  const [user] = await db
    .update(users)
    .set({
      ...data.form,
    })
    .where(eq(users.id, authUser.id))
    .returning()

  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }

  return c.json(user, HttpStatusCodes.OK)
}

export const resetPassword: AppRouteHandler<ResetPasswordRoute> = async (c) => {
  const { token, password } = await c.req.json()
  if (!token) {
    return c.json({ error: 'Token is required' }, HttpStatusCodes.BAD_REQUEST)
  }
  const db = getDb(c.env)
  const verification = await db.query.verifications.findFirst({
    where: eq(verifications.identifier, `reset-password:${token}`),
  })
  if (!verification) {
    return c.json(
      { error: 'Verification not found' },
      HttpStatusCodes.NOT_FOUND
    )
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, verification.value),
  })

  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }
  const hashedPassword = await hashPassword(password)
  await db
    .update(accounts)
    .set({ password: hashedPassword })
    .where(eq(accounts.userId, user.id))
  return c.json({ success: true }, HttpStatusCodes.OK)
}

export const getAccount: AppRouteHandler<GetAccountRoute> = async (c) => {
  const authUser = await c.get('user')
  const provider = c.req.param('provider')
  if (!authUser) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const db = getDb(c.env)
  const account = await db.query.accounts.findFirst({
    where: and(
      eq(accounts.userId, authUser.id),
      eq(accounts.providerId, provider)
    ),
  })
  if (!account) {
    return c.json({ error: 'Account not found' }, HttpStatusCodes.NOT_FOUND)
  }
  return c.json(account, HttpStatusCodes.OK)
}
