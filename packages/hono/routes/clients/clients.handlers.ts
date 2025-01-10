import { HttpStatusCodes } from '@rabbit/http'
import { db } from '@rabbit/database'
import { AppRouteHandler } from '../../lib/types'
import {
  GetClientsRoute,
  AddClientRoute,
  UpdateClientRoute,
  DeleteClientRoute,
  GetClientByIdRoute,
  AddBulkClientsRoute,
  DeleteBulkClientsRoute,
} from './clients.routes'
import { eq, sql, and, or, inArray } from 'drizzle-orm'
import { clients } from '@rabbit/database/schema/app/clients'
import { ClientFormData } from '@rabbit/design-system/components/dashboard/clients/client-schema'

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
      orderBy: (clients, { desc }) => [desc(clients.createdAt)],
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

  try {
    const data = await c.req.valid('json')
    const { id, ...clientData } = data

    await db
      .update(clients)
      .set(clientData)
      .where(and(eq(clients.id, id), eq(clients.userId, user.id)))

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

export const deleteBulkClients: AppRouteHandler<
  DeleteBulkClientsRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { ids } = await c.req.json()
  try {
    await db.delete(clients).where(inArray(clients.id, ids))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error deleting clients:', error)
    return c.json(
      { error: 'Failed to delete clients' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const addBulkClients: AppRouteHandler<AddBulkClientsRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const bulkClientData = await c.req.json()
  try {
    await db.insert(clients).values(
      bulkClientData.map((client: ClientFormData) => ({
        ...client,
        userId: user.id,
      }))
    )
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error adding clients:', error)
    return c.json(
      { error: 'Failed to add clients' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
