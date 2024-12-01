import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from '@ff/database/schema/users'

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  token: text('token'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
