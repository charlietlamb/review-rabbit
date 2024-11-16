import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { users } from './users'
import { timestamps } from './columns.helpers'
import { media } from './media'

export const uploads = pgTable('uploads', {
  id: uuid('id').primaryKey(),
  userId: uuid('userId').references(() => users.id),
  mediaId: uuid('mediaId').references(() => media.id),
  ...timestamps,
})

export const selectUploadSchema = createSelectSchema(uploads)
export const insertUploadSchema = createInsertSchema(uploads)
export type Upload = typeof uploads.$inferSelect
