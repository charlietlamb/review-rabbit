import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const verifications = pgTable('verifications', {
  id: uuid('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
})
