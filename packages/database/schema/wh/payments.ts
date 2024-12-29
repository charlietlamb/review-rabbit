import {
  pgTable,
  text,
  timestamp,
  jsonb,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { subscriptions } from './subscriptions'
import { paymentIntents } from './payment-intents'

export const payments = pgTable('wh_payments', {
  id: text('id').primaryKey(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  subscriptionId: text('subscriptionId')
    .references(() => subscriptions.id)
    .notNull(),
  paymentIntentId: text('paymentIntentId')
    .references(() => paymentIntents.id)
    .notNull(),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  paymentMethod: text('paymentMethod').notNull(),
  receiptEmail: text('receiptEmail'),
  receiptUrl: text('receiptUrl'),
  failureMessage: text('failureMessage'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
