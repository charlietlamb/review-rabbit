import { pgTable, timestamp, text, jsonb } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'

export const customers = pgTable('wh_customers', {
  id: text('id').primaryKey(),
  stripeId: text('stripeId').unique().notNull(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  email: text('email').notNull(),
  name: text('name'),
  phone: text('phone'),
  address: jsonb('address'),
  shipping: jsonb('shipping'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
