'use server'

import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import client from '@rabbit/design-system/lib/client'

export async function deleteBulkClients(ids: string[]): Promise<boolean> {
  const response = await client.clients['delete-bulk'].$post(
    { json: { ids } },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to delete clients')
  }
  return response.ok
}
