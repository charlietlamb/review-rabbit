'use server'

import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { ClientFormData } from '@rabbit/design-system/components/dashboard/clients/client-schema'
import client from '@rabbit/design-system/lib/client'

export async function updateClient(
  newClient: ClientFormData,
  id: string,
  businessId: string,
  locationId?: string
): Promise<boolean> {
  const response = await client.clients.update.$post(
    { json: { ...newClient, id, businessId, locationId } },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to update client')
  }
  return response.ok
}
