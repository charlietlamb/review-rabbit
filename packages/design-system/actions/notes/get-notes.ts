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

export async function getNotes(
  offset: number,
  limit: number,
  mediationId?: string
): Promise<NoteWithMediation[]> {
  const response = await client.notes.$post(
    {
      json: {
        offset,
        limit,
        mediationId,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    console.error(
      'Failed to fetch notes: ',
      response.statusText,
      response.status
    )
    return []
  }
  const data = await response.json()
  return data.map(transformDates)
}
