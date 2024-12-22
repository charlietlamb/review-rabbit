'use server'

import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import client from '@remio/design-system/lib/client'
import { NoteWithMediation } from '@remio/database/schema/notes'

function transformDates(note: any): NoteWithMediation {
  return {
    ...note,
    createdAt: new Date(note.createdAt),
    updatedAt: new Date(note.updatedAt),
    mediation: {
      ...note.mediation,
      date: new Date(note.mediation.date),
      createdAt: new Date(note.mediation.createdAt),
      updatedAt: new Date(note.mediation.updatedAt),
    },
  }
}

export async function getNoteById(
  id: string
): Promise<NoteWithMediation | null> {
  const response = await client.notes['get-by-id'].$post(
    {
      json: { id },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    console.error(
      'Failed to fetch note: ',
      response.statusText,
      response.status
    )
    return null
  }
  const data = await response.json()
  return transformDates(data)
}
