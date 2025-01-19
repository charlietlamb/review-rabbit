'use server'

import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { ClientFormData } from '@rabbit/design-system/components/dashboard/clients/client-schema'
import client from '@rabbit/design-system/lib/client'

export async function addBulkClients(
  bulkClientData: ClientFormData[],
  businessId: string,
  locationId?: string
): Promise<number> {
  const response = await client.clients['add-bulk'].$post(
    { json: { clients: bulkClientData, businessId, locationId } },
    await headersWithCookies()
  )
  if (!response.ok) {
    console.error('Failed to fetch clients')
    return response.status
  }
  return response.status
}
