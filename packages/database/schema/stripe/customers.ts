import { pgTable, text } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'

export const customers = pgTable('customers', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .references(() => users.id)
    .unique()
    .notNull(),
})
