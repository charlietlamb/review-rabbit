import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { users } from './users'
import { timestamps } from './columns.helpers'

export const media = pgTable('media', {
  id: uuid('id').primaryKey(),
  userId: uuid('userId').references(() => users.id),
  pathId: uuid('pathId').notNull(),
  name: text('name').notNull(),
  size: integer('size').notNull(),
  type: text('type').notNull(),
  duration: integer('duration').notNull(),
  language: text('language'),
  ...timestamps,
})

export const selectMediaSchema = createSelectSchema(media)
export const insertMediaSchema = createInsertSchema(media)
export type Media = typeof media.$inferSelect
