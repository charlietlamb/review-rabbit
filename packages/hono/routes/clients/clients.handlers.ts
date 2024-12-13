import { HttpStatusCodes } from '@remio/http'
import { db } from '@remio/database'
import { AppRouteHandler } from '../../lib/types'
import {
  GetClientsRoute,
  AddClientRoute,
  UpdateClientRoute,
  DeleteClientRoute,
  GetClientsChartRoute,
  GetClientByIdRoute,
} from './clients.routes'
import { eq, sql, and, or } from 'drizzle-orm'
import { clients } from '@remio/database'

export const getClients: AppRouteHandler<GetClientsRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit, search } = await c.req.json()

  try {
    const results = await db.query.clients.findMany({
      where: and(
        eq(clients.userId, user.id),
        or(
          sql`LOWER(${clients.name}) LIKE ${`%${search?.toLowerCase()}%`}`,
          sql`LOWER(${clients.email}) LIKE ${`%${search?.toLowerCase()}%`}`
        )
      ),
      offset,
      limit,
    })
    return c.json(results, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return c.json(
      { error: 'Failed to fetch clients' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getClientById: AppRouteHandler<GetClientByIdRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.json()
  try {
    const client = await db.query.clients.findFirst({
      where: and(eq(clients.id, id), eq(clients.userId, user.id)),
    })
    if (!client) {
      return c.json({ error: 'Client not found' }, HttpStatusCodes.NOT_FOUND)
    }
    return c.json(client, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching client:', error)
    return c.json(
      { error: 'Failed to fetch client' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const addClient: AppRouteHandler<AddClientRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const newClient = await c.req.json()
  console.log('newClient', newClient)
  try {
    await db.insert(clients).values({ ...newClient, userId: user.id })
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error adding client:', error)
    return c.json(
      { error: 'Failed to add client' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const updateClient: AppRouteHandler<UpdateClientRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const client = await c.req.json()
  try {
    await db.update(clients).set(client).where(eq(clients.id, client.id))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error updating client:', error)
    return c.json(
      { error: 'Failed to update client' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const deleteClient: AppRouteHandler<DeleteClientRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.json()
  try {
    await db.delete(clients).where(eq(clients.id, id))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error deleting client:', error)
    return c.json(
      { error: 'Failed to delete client' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getClientsChart: AppRouteHandler<GetClientsChartRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { startDate, endDate } = await c.req.json()

  try {
    const chartData = await db
      .select({
        date: sql<string>`to_char(DATE(${clients.createdAt}), 'YYYY-MM-DD')`,
        clients: sql<number>`count(${clients.id})`,
      })
      .from(clients)
      .where(
        and(
          eq(clients.userId, user.id),
          sql`${clients.createdAt} >= ${startDate}`,
          sql`${clients.createdAt} <= ${endDate}`
        )
      )
      .groupBy(sql`DATE(${clients.createdAt})`)
      .orderBy(sql`DATE(${clients.createdAt})`)

    if (!chartData || chartData.length === 0) {
      return c.json([], HttpStatusCodes.OK)
    }

    return c.json(chartData, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching clients chart:', error)
    return c.json(
      {
        error: 'Failed to fetch clients chart',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
