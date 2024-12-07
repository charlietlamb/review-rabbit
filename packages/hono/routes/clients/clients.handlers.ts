import { HttpStatusCodes } from '@remio/http'
import { db } from '@remio/database'
import { AppRouteHandler } from '../../lib/types'
import {
  GetClientsRoute,
  AddClientRoute,
  UpdateClientRoute,
  DeleteClientRoute,
  GetClientsChartRoute,
} from './clients.routes'
import { eq, sql } from 'drizzle-orm'
import { clients } from '@remio/database'

export const getClients: AppRouteHandler<GetClientsRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit } = await c.req.json()

  try {
    const results = await db.query.clients.findMany({
      where: eq(clients.userId, user.id),
      offset,
      limit,
    })
    return c.json(results, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return c.json(
      {
        error: 'Failed to fetch clients',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
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

  try {
    const chartData = await db
      .select({
        date: sql<string>`to_char(DATE(${clients.createdAt}), 'YYYY-MM-DD')`,
        clients: sql<number>`count(${clients.id})`,
      })
      .from(clients)
      .where(eq(clients.userId, user.id))
      .groupBy(sql`DATE(${clients.createdAt})`)
      .orderBy(sql`DATE(${clients.createdAt})`)
      .limit(90)

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
