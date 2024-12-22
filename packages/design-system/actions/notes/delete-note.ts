'use server'

import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import client from '@remio/design-system/lib/client'

export async function deleteNote(id: string): Promise<boolean> {
  const response = await client.notes.delete.$post(
    { json: { id } },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to delete note')
  }
  return response.ok
}
