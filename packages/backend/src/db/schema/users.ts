import { plans } from '../../lib/types'
import {
  timestamp,
  pgTable,
  text,
  boolean,
  uuid,
  pgEnum,
} from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

const plan = pgEnum('plan', plans)

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  imageUploaded: boolean('imageUploaded').default(false).notNull(),
  imageExpiresAt: timestamp('imageExpiresAt'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  plan: plan().default('free').notNull(),
})

export const selectUserSchema = createSelectSchema(users)
export const insertUserSchema = createInsertSchema(users)
export type User = typeof users.$inferSelect
