'use server'

import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import { ClientFormData } from '@remio/design-system/components/dashboard/clients/client-schema'
import client from '@remio/design-system/lib/client'

export async function addClient(newClient: ClientFormData): Promise<boolean> {
  const response = await client.clients.add.$post(
    { json: newClient },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  return response.ok
}
