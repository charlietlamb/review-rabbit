import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { customers } from './customers'

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey().notNull(),
  customerId: text('customer_id')
    .references(() => customers.id)
    .notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
