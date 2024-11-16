import { AppRouteHandler } from '@/src/lib/types'
import { HttpStatusCodes } from '@/src/http'
import { StoreMediaRoute } from './media.routes'
import { db } from '@/src/db/postgres'
import { media } from '@/src/db/schema/media'

export const storeMedia: AppRouteHandler<StoreMediaRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const body = await c.req.json()
  try {
    await db.insert(media).values({
      ...body,
      id: body.path,
      userId: user.id,
    })
    return c.json({ id: body.path }, HttpStatusCodes.OK)
  } catch (error) {
    console.error(error)
    return c.json(
      { error: 'Failed to store media' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
