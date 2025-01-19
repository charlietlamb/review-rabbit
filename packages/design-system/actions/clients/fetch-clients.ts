'use server'

import { ClientWithData } from '@rabbit/database/schema/app/clients'
import client from '@rabbit/design-system/lib/client'
import { PAGE_SIZE } from '@rabbit/design-system/data/page-size'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { transformClient } from '@rabbit/design-system/lib/transforms/client-transform'

export async function fetchClients(
  page: number,
  search?: string
): Promise<ClientWithData[]> {
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

  return clientsResults.map((client) => transformClient(client))
}
