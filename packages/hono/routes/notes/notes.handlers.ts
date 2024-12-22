import { HttpStatusCodes } from '@remio/http'
import { db, mediationClients } from '@remio/database'
import { AppRouteHandler } from '../../lib/types'
import {
  GetNotesRoute,
  AddNoteRoute,
  UpdateNoteRoute,
  DeleteNoteRoute,
  GetNoteByIdRoute,
} from './notes.routes'

import { eq, and } from 'drizzle-orm'
import { notes } from '@remio/database'

export const getNotes: AppRouteHandler<GetNotesRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit, mediationId } = await c.req.valid('json')

  try {
    const whereConditions = [eq(notes.userId, user.id)]
    if (mediationId) {
      whereConditions.push(eq(notes.mediationId, mediationId))
    }

    const results = await db.query.notes.findMany({
      where: and(...whereConditions),
      offset,
      limit,
      with: {
        mediation: {
          with: {
            mediationClients: {
              with: {
                client: true,
                invoice: true,
              },
            },
          },
        },
      },
    })

    const notesWithData = results.map((note) => ({
      ...note,
      mediation: {
        ...note.mediation,
        data: note.mediation.mediationClients.map((mc) => ({
          client: mc.client,
          invoice: mc.invoice,
          email: mc.email,
        })),
      },
    }))

    return c.json(notesWithData, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching notes:', error)
    return c.json(
      {
        error: 'Failed to fetch notes',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const addNote: AppRouteHandler<AddNoteRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const newNote = await c.req.valid('json')
  try {
    await db.insert(notes).values({
      ...newNote,
      userId: user.id,
    })
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error adding note:', error)
    return c.json(
      { error: 'Failed to add note' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const updateNote: AppRouteHandler<UpdateNoteRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const note = await c.req.valid('json')
  try {
    await db
      .update(notes)
      .set({
        content: note.content,
        updatedAt: new Date(),
      })
      .where(and(eq(notes.id, note.id), eq(notes.userId, user.id)))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error updating note:', error)
    return c.json(
      { error: 'Failed to update note' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const deleteNote: AppRouteHandler<DeleteNoteRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.json()
  try {
    await db
      .delete(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, user.id)))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error deleting note:', error)
    return c.json(
      { error: 'Failed to delete note' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getNoteById: AppRouteHandler<GetNoteByIdRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.json()
  try {
    const note = await db.query.notes.findFirst({
      where: and(eq(notes.id, id), eq(notes.userId, user.id)),
      with: {
        mediation: {
          with: {
            mediationClients: {
              with: {
                client: true,
                invoice: true,
              },
            },
          },
        },
      },
    })
    if (!note) {
      return c.json({ error: 'Note not found' }, HttpStatusCodes.NOT_FOUND)
    }

    const noteWithData = {
      ...note,
      mediation: {
        ...note.mediation,
        data: note.mediation.mediationClients.map((mc) => ({
          client: mc.client,
          invoice: mc.invoice,
          email: mc.email,
        })),
      },
    }

    return c.json(noteWithData, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching note:', error)
    return c.json(
      { error: 'Failed to fetch note' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
