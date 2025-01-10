'use server'

import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import client from '@rabbit/design-system/lib/client'

export async function deleteBulkAutomations(ids: string[]): Promise<number> {
  const response = await client.automations['delete-bulk'].$post(
    { json: { ids } },
    await headersWithCookies()
  )
  if (!response.ok) {
    console.error('failed to delete automations')
    return response.status
  }
  return response.status
}
