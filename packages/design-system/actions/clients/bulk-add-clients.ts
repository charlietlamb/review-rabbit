'use server'

import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { ClientFormData } from '@rabbit/design-system/components/dashboard/clients/client-schema'
import client from '@rabbit/design-system/lib/client'

export async function addBulkClients(
  bulkClientData: ClientFormData[]
): Promise<number> {
  const response = await client.clients['add-bulk'].$post(
    { json: bulkClientData },
    await headersWithCookies()
  )
  if (!response.ok) {
    console.error('Failed to fetch clients')
    return response.status
  }
  return response.status
}
