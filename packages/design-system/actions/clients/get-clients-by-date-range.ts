'use server'

import { ClientWithReviewMatches } from '@rabbit/database/schema/app/clients'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function getClientsByDateRange(
  from: Date,
  to: Date
): Promise<ClientWithReviewMatches[]> {
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

  return clientsResults.map((client) => ({
    ...client,
    createdAt: new Date(client.createdAt),
    updatedAt: new Date(client.updatedAt),
    reviewMatches: client.reviewMatches.map((match) => ({
      ...match,
      createdAt: new Date(match.createdAt),
      updatedAt: new Date(match.updatedAt),
    })),
  }))
}
