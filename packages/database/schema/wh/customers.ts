import { pgTable, timestamp, varchar, text, jsonb } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'

export const customers = pgTable('wh_customers', {
  id: varchar('id').primaryKey(),
  stripeId: varchar('stripeId').unique().notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  email: varchar('email').notNull(),
  name: varchar('name'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
