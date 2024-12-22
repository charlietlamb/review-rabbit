'use server'

import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import client from '@remio/design-system/lib/client'

interface AddNoteData {
  mediationId: string
  content: string
}

export async function addNote(newNote: AddNoteData): Promise<boolean> {
  const response = await client.notes.add.$post(
    {
      json: newNote,
    },
    await headersWithCookies()
  )
  if (!response.ok)
    console.error('Failed to add note: ', response.statusText, response.status)
  return response.ok
}
