'use server'

import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import client from '@rabbit/design-system/lib/client'

export async function deleteClient(id: string): Promise<boolean> {
  const response = await client.clients.delete.$post(
    { json: { id } },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to delete client')
  }
  return response.ok
}
