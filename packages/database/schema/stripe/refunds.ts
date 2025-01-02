import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { payments } from './payments'

export const refunds = pgTable('refunds', {
  id: text('id').primaryKey().notNull(),
  paymentId: text('payment_id')
    .references(() => payments.id)
    .notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
