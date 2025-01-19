'use server'

import { ClientWithData } from '@rabbit/database/schema/app/clients'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { transformClient } from '@rabbit/design-system/lib/transforms/client-transform'
export async function getClientsByDateRange(
  from: Date,
  to: Date
): Promise<ClientWithData[]> {
  const response = await client.clients['get-by-date-range'].$post(
    {
      json: {
        from,
        to,
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
