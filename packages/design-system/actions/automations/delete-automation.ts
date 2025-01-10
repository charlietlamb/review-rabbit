'use server'

import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import client from '@rabbit/design-system/lib/client'

export async function deleteAutomation(id: string): Promise<number> {
  const response = await client.automations.delete.$post(
    { json: { id } },
    await headersWithCookies()
  )
  if (!response.ok) {
    console.error('failed to delete automation')
    return response.status
  }
  return response.status
}
