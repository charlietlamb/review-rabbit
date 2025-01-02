import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { customers } from './customers'

export const payments = pgTable('payments', {
  id: text('id').primaryKey().notNull(),
  customerId: text('customer_id')
    .references(() => customers.id)
    .notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  amountReceived: integer('amount_received').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastError: text('last_error'),
  nextAction: text('next_action'),
  paymentMethod: text('payment_method'),
})
