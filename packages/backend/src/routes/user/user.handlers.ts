import {
  GetUserFromTokenRoute,
  GetUserRoute,
  UpdateUserRoute,
} from './user.routes'
import { AppRouteHandler } from '@/src/lib/types'
import { db } from '@/src/db/postgres'
import { eq } from 'drizzle-orm'
import { users } from '@/src/db/schema/users'
import { updateUserSchema } from './user.schema'
import { HttpStatusCodes } from '@/src/http'
import { resets } from '@/src/db/schema/resets'

export const get: AppRouteHandler<GetUserRoute> = async (c) => {
  const userId = c.req.param('userId')
  if (!userId) {
    return c.json({ error: 'User ID is required' }, HttpStatusCodes.BAD_REQUEST)
  }
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
  const body = await c.req.json()
  const data = updateUserSchema.parse(body)
  if (!data) {
    return c.json({ error: 'Incorrect body sent' }, HttpStatusCodes.BAD_REQUEST)
  }

  const [user] = await db
    .update(users)
    .set({
      ...data.form,
      emailVerified: data.form.email === authUser.email,
    })
    .where(eq(users.id, authUser.id))
    .returning()

  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }

  return c.json(user, HttpStatusCodes.OK)
}

export const getFromToken: AppRouteHandler<GetUserFromTokenRoute> = async (
  c
) => {
  const json = await c.req.json()
  const { token } = json
  if (!token) {
    return c.json(
      { error: 'Reset token is required' },
      HttpStatusCodes.BAD_REQUEST
    )
  }
  const reset = await db.query.resets.findFirst({
    where: eq(resets.value, token),
  })
  if (!reset) {
    return c.json({ error: 'Reset token not found' }, HttpStatusCodes.NOT_FOUND)
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, reset.userId),
  })
  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }
  return c.json(user, HttpStatusCodes.OK)
}
