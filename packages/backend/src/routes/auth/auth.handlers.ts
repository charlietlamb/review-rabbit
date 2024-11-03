import { AppRouteHandler } from '@/src/lib/types'
import { HttpStatusCodes } from '@/src/http'
import { UserRoute } from './auth.routes'

export const user: AppRouteHandler<UserRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }
  return c.json(user, HttpStatusCodes.OK)
}
