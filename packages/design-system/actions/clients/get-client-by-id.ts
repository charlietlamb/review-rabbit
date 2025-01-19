'use server'

import { ClientWithData } from '@rabbit/database/schema/app/clients'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function getClientById(id: string): Promise<ClientWithData> {
  const response = await client.clients['get-by-id'].$post(
    {
      json: {
        id,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch client')
  }
  const clientResponse = await response.json()

  return {
    ...clientResponse,
    createdAt: new Date(clientResponse.createdAt),
    updatedAt: new Date(clientResponse.updatedAt),
    reviewMatches: clientResponse.reviewMatches.map((match) => ({
      ...match,
      createdAt: new Date(match.createdAt),
      updatedAt: new Date(match.updatedAt),
    })),
  }
}
