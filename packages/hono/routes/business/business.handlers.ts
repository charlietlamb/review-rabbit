import { HttpStatusCodes } from '@rabbit/http'
import {
  CreateBusinessRoute,
  GetBusinessRoute,
  GetBusinessByIdRoute,
  UpdateBusinessRoute,
  DeleteBusinessRoute,
} from '@rabbit/hono/routes/business/business.routes'
import { AppRouteHandler } from '@rabbit/hono/lib/types'
import { db } from '@rabbit/database'
import { businesses } from '@rabbit/database/schema/app/businesses'
import { and, eq } from 'drizzle-orm'

export const create: AppRouteHandler<CreateBusinessRoute> = async (c) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const body = await c.req.valid('json')
  try {
    await db.insert(businesses).values({
      ...body,
      userId: user.id,
    })
  } catch (error) {
    return c.json(
      { error: 'Failed to create business' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  return c.json({ success: true }, HttpStatusCodes.OK)
}

export const get: AppRouteHandler<GetBusinessRoute> = async (c) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit } = await c.req.valid('json')

  try {
    const businessesFromDatabase = await db.query.businesses.findMany({
      where: eq(businesses.userId, user.id),
      offset,
      limit,
    })
    return c.json(businessesFromDatabase, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to retrieve businesses' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getById: AppRouteHandler<GetBusinessByIdRoute> = async (c) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.valid('json')
  try {
    const businessFromDatabase = await db.query.businesses.findFirst({
      where: and(eq(businesses.id, id), eq(businesses.userId, user.id)),
    })
    return c.json(businessFromDatabase, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to retrieve business' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const update: AppRouteHandler<UpdateBusinessRoute> = async (c) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id, ...body } = await c.req.valid('json')
  try {
    await db
      .update(businesses)
      .set(body)
      .where(and(eq(businesses.id, id), eq(businesses.userId, user.id)))

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to update business' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const deleteBusiness: AppRouteHandler<DeleteBusinessRoute> = async (
  c
) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.valid('json')
  try {
    await db
      .delete(businesses)
      .where(and(eq(businesses.id, id), eq(businesses.userId, user.id)))

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to delete business' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
