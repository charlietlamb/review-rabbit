import { AppRouteHandler } from '@dubble/hono/lib/types'
import { HttpStatusCodes } from '@dubble/http'
import {
  FetchMediaBatchRoute,
  FetchMediaRoute,
  StoreMediaRoute,
} from './media.routes'
import { db } from '@dubble/database'
import { media } from '@dubble/database/schema/media'
import { and, eq, desc, inArray } from 'drizzle-orm'
import { env } from '@dubble/env'

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
      url: `${env.AWS_S3_URL}${env.AWS_S3_BUCKET_NAME}/media/${body.path}.${body.extension}`,
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

export const fetchMedia: AppRouteHandler<FetchMediaRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const body = await c.req.json()
  try {
    const mediaResults = await db.query.media.findMany({
      where: and(eq(media.userId, user.id), eq(media.source, body.source)),
      orderBy: [desc(media.createdAt)],
      limit: body.limit,
      offset: body.offset,
    })
    return c.json(mediaResults, HttpStatusCodes.OK)
  } catch (error) {
    console.error(error)
    return c.json(
      { error: 'Failed to store media' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const fetchMediaBatch: AppRouteHandler<FetchMediaBatchRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const body = await c.req.json()
  const ids = body.ids
  try {
    const mediaResults = await db.query.media.findMany({
      where: inArray(media.id, ids),
      orderBy: [desc(media.createdAt)],
    })
    return c.json(mediaResults, HttpStatusCodes.OK)
  } catch (error) {
    console.error(error)
    return c.json(
      { error: 'Failed to store media' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
