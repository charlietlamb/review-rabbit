'use server'

import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { ClientFormData } from '@rabbit/design-system/components/dashboard/clients/client-schema'
import client from '@rabbit/design-system/lib/client'

export async function addClient(
  newClient: ClientFormData,
  businessId: string,
  locationId?: string
): Promise<boolean> {
  const response = await client.clients.add.$post(
    { json: { ...newClient, businessId, locationId } },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  return response.ok
}
