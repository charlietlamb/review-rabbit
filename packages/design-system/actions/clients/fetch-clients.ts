'use server'

import { Client } from '@rabbit/database/schema/app/clients'
import client from '@rabbit/design-system/lib/client'
import { PAGE_SIZE } from '@rabbit/design-system/data/page-size'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function fetchClients(
  page: number,
  search?: string
): Promise<Client[]> {
  const response = await client.clients.$post(
    {
      json: {
        offset: page * PAGE_SIZE,
        limit: PAGE_SIZE,
        search,
      },
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
