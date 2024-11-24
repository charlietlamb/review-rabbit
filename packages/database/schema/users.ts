import { timestamp, pgTable, text, boolean } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  imageUploaded: boolean('imageUploaded').default(false).notNull(),
  imageExpiresAt: timestamp('imageExpiresAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  plan: text('plan').default('free').notNull(),
})

export const selectUserSchema = createSelectSchema(users)
export const insertUserSchema = createInsertSchema(users)
export type User = typeof users.$inferSelect
