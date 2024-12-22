import { z } from 'zod'

export const notesRequestSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  mediationId: z.string().optional(),
})

export type NotesRequest = z.infer<typeof notesRequestSchema>

export const noteFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
  mediationId: z.string(),
})

export type NoteForm = z.infer<typeof noteFormSchema>
