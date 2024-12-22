import { HttpStatusCodes } from '@remio/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@remio/hono/lib/configure-auth'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { noteWithMediationSchema } from '@remio/database/schema/notes'
import {
  noteFormSchema,
  notesRequestSchema,
} from '@remio/design-system/components/dashboard/notes/note-types'

const tags = ['Notes']

export const getNotes = createRoute({
  path: '/notes',
  method: 'post',
  summary: 'Get notes with mediation',
  tags,
  request: {
    body: {
      description: 'Pagination parameters',
      content: {
        'application/json': {
          schema: notesRequestSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(noteWithMediationSchema),
      'Notes with mediation fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch notes'
    ),
    ...unauthorizedSchema,
  },
})

export type GetNotesRoute = typeof getNotes

export const addNote = createRoute({
  path: '/notes/add',
  method: 'post',
  summary: 'Add a note',
  tags,
  request: {
    body: {
      description: 'Note data',
      content: {
        'application/json': {
          schema: noteFormSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Note added.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to add note'
    ),
    ...unauthorizedSchema,
  },
})

export type AddNoteRoute = typeof addNote

export const updateNote = createRoute({
  path: '/notes/update',
  method: 'post',
  summary: 'Update a note',
  tags,
  request: {
    body: {
      description: 'Note data',
      content: {
        'application/json': {
          schema: noteFormSchema.extend({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Note updated.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to update note'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateNoteRoute = typeof updateNote

export const deleteNote = createRoute({
  path: '/notes/delete',
  method: 'post',
  summary: 'Delete a note',
  tags,
  request: {
    body: {
      description: 'Note ID',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Note deleted.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete note'
    ),
    ...unauthorizedSchema,
  },
})

export type DeleteNoteRoute = typeof deleteNote

export const getNoteById = createRoute({
  path: '/notes/get-by-id',
  method: 'post',
  summary: 'Get note by id',
  tags,
  request: {
    body: {
      description: 'Note ID',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(noteWithMediationSchema, 'Note fetched.'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Note not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch note'
    ),
    ...unauthorizedSchema,
  },
})

export type GetNoteByIdRoute = typeof getNoteById
