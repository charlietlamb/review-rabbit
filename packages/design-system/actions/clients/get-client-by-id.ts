'use server'

import { ClientWithData } from '@rabbit/database/schema/app/clients'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { transformClient } from '@rabbit/design-system/lib/transforms/client-transform'

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

  return transformClient(clientResponse)
}
