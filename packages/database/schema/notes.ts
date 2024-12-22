import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { users } from './users'
import { relations } from 'drizzle-orm'
import {
  mediations,
  mediationSchema,
  mediationWithDataSchema,
} from './mediations'

export const notes = pgTable('notes', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  mediationId: text('mediation_id')
    .notNull()
    .references(() => mediations.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
  mediation: one(mediations, {
    fields: [notes.mediationId],
    references: [mediations.id],
  }),
}))

export const noteSchema = createSelectSchema(notes)
export const insertNoteSchema = createInsertSchema(notes)
export type Note = z.infer<typeof noteSchema>
export type NewNote = z.infer<typeof insertNoteSchema>

export const noteWithMediationSchema = noteSchema.extend({
  mediation: mediationWithDataSchema,
})

export type NoteWithMediation = z.infer<typeof noteWithMediationSchema>
