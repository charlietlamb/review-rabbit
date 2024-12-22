'use server'

import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import client from '@remio/design-system/lib/client'
import { NoteForm } from '@remio/design-system/components/dashboard/notes/note-types'

export async function updateNote(note: NoteForm, id: string): Promise<boolean> {
  const response = await client.notes.update.$post(
    {
      json: { ...note, id },
    },
    await headersWithCookies()
  )
  if (!response.ok)
    console.error(
      'Failed to update note: ',
      response.statusText,
      response.status
    )
  return response.ok
}
