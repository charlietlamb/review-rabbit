import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users'

export const resets = pgTable('resets', {
  id: uuid('id').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id),
  value: uuid('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
})
