'use server'

import {
  ClientWithReviewMatches,
} from '@rabbit/database/schema/app/clients'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function getClientById(
  id: string
): Promise<ClientWithReviewMatches> {
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
  }
}
