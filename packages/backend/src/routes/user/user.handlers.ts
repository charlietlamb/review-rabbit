import { GetUserRoute, UpdateUserRoute } from './user.routes'
import { AppRouteHandler } from '@/src/lib/types'
import { db } from '@/src/db/postgres'
import { eq } from 'drizzle-orm'
import { users } from '@/src/db/schema/users'
import { updateUserSchema } from './schema'
import { HttpStatusCodes } from '@/src/http'

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
  const body = await c.req.json()
  const data = updateUserSchema.parse(body)
  if (!data) {
    return c.json({ error: 'Incorrect body sent' }, HttpStatusCodes.BAD_REQUEST)
  }

  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, data.id))
    .returning()

  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }

  return c.json(user, HttpStatusCodes.OK)
}
