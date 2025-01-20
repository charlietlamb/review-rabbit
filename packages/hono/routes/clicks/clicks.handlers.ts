import { HttpStatusCodes } from '@rabbit/http'
import { clicks, ClickWithData, getDb } from '@rabbit/database'
import { AppRouteHandler } from '../../lib/types'
import { eq, and, between, sql } from 'drizzle-orm'
import { GetClicksByDateRangeRoute, GetClicksRoute } from './clicks.routes'

function transformClick(click: ClickWithData) {
  return {
    ...click,
    createdAt: click.createdAt.toISOString(),
    updatedAt: click.updatedAt.toISOString(),
    automationItem: click.automationItem
      ? {
          ...click.automationItem,
          createdAt: click.automationItem.createdAt.toISOString(),
          updatedAt: click.automationItem.updatedAt.toISOString(),
          scheduledFor: click.automationItem.scheduledFor.toISOString(),
        }
      : null,
  }
}

export const getClicks: AppRouteHandler<GetClicksRoute> = async (c) => {
  const user = c.get('user')
  const db = getDb(c.env)
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit, automationItemId, businessId } =
    await c.req.valid('json')

  try {
    const results = await db.query.clicks.findMany({
      where: and(
        eq(clicks.businessId, businessId),
        automationItemId
          ? eq(clicks.automationItemId, automationItemId)
          : undefined
      ),
      offset,
      limit,
      with: {
        automationItem: true,
        business: true,
      },
      orderBy: (clicks, { desc }) => [desc(clicks.createdAt)],
    })

    return c.json(results.map(transformClick), HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching clicks:', error)
    return c.json(
      { error: 'Failed to fetch clicks' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getClicksByDateRange: AppRouteHandler<
  GetClicksByDateRangeRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const db = getDb(c.env)
  const { from, to, businessId, automationItemId } = await c.req.valid('json')
  try {
    const clickData = await db.query.clicks.findMany({
      where: and(
        eq(clicks.businessId, businessId),
        automationItemId
          ? eq(clicks.automationItemId, automationItemId)
          : undefined,
        between(clicks.createdAt, sql`timestamp ${from}`, sql`timestamp ${to}`)
      ),
      with: {
        automationItem: true,
        business: true,
      },
    })

    return c.json(clickData.map(transformClick), HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching clicks by date range:', error)
    return c.json(
      { error: 'Failed to fetch clicks by date range' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
