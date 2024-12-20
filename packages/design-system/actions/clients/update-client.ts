'use server'

import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import { ClientFormData } from '@remio/design-system/components/dashboard/clients/client-schema'
import client from '@remio/design-system/lib/client'

export async function updateClient(
  newClient: ClientFormData,
  id: string
): Promise<boolean> {
  console.log('updating client', newClient, id)
  const response = await client.clients.update.$post(
    { json: { ...newClient, id } },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to update client')
  }
  return response.ok
}
