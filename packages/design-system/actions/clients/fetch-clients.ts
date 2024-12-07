'use server'

import { Client } from '@remio/database/schema/clients'
import client from '@remio/design-system/lib/client'
import { PAGE_SIZE } from '@remio/design-system/data/page-size'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'

export async function fetchClients(page: number): Promise<Client[]> {
  const response = await client.clients.$post(
    {
      json: { offset: page * PAGE_SIZE, limit: PAGE_SIZE },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  const clientsResults = await response.json()

  return clientsResults.map((client) => ({
    ...client,
    createdAt: new Date(client.createdAt),
    updatedAt: new Date(client.updatedAt),
  }))
}
