import { AppRouteHandler } from '@burse/hono/lib/types'
import { HttpStatusCodes } from '@burse/http'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { db } from '@burse/database'
import { and, eq } from 'drizzle-orm'
import {
  GetStripeConnectsRoute,
  GetStripeConnectByIdRoute,
  UpdateStripeConnectRoute,
} from './stripe-connects.routes'

export const getStripeConnects: AppRouteHandler<
  GetStripeConnectsRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { offset, limit } = await c.req.valid('json')

  try {
    const stripeConnectsList = await db.query.stripeConnects.findMany({
      where: eq(stripeConnects.userId, user.id),
      offset,
      limit,
    })
    return c.json({ stripeConnects: stripeConnectsList }, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error getting stripe connects:', error)
    return c.json(
      { error: 'Failed to get stripe connects' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getStripeConnectById: AppRouteHandler<
  GetStripeConnectByIdRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { id } = await c.req.valid('json')
  try {
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, id),
    })

    if (!stripeConnect) {
      return c.json(
        { error: 'Stripe connect not found' },
        HttpStatusCodes.NOT_FOUND
      )
    }

    if (stripeConnect.userId !== user.id) {
      return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
    }

    return c.json({ stripeConnect: stripeConnect }, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error getting stripe connect:', error)
    return c.json(
      { error: 'Failed to get stripe connect' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const updateStripeConnect: AppRouteHandler<
  UpdateStripeConnectRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { id, title } = await c.req.valid('json')

  try {
    const stripeConnect = await db
      .update(stripeConnects)
      .set({ title })
      .where(and(eq(stripeConnects.id, id), eq(stripeConnects.userId, user.id)))
  } catch (error) {
    console.error('Error updating stripe connect:', error)
    return c.json(
      { error: 'Failed to update stripe connect' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  return c.json({ success: true }, HttpStatusCodes.OK)
}
