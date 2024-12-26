import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { users } from './users'
import { sql } from 'drizzle-orm'

export const media = pgTable('media', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  name: text('name').notNull(),
  size: integer('size').notNull(),
  extension: text('type').notNull(),
  mimeType: text('mimeType').notNull(),
  duration: integer('duration').notNull(),
  url: text('url').notNull(),
  source: text('source').notNull(),
  language: text('language'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const selectMediaSchema = createSelectSchema(media)
export const insertMediaSchema = createInsertSchema(media)
export type Media = typeof media.$inferSelect
