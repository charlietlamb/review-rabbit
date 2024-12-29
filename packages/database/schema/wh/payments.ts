import {
  pgTable,
  timestamp,
  varchar,
  decimal,
  jsonb,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { subscriptions } from './subscriptions'
import { paymentIntents } from './payment-intents'

export const payments = pgTable('wh_payments', {
  id: varchar('id').primaryKey(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId')
    .references(() => customers.id)
    .notNull(),
  subscriptionId: varchar('subscriptionId')
    .references(() => subscriptions.id)
    .notNull(),
  paymentIntentId: varchar('paymentIntentId')
    .references(() => paymentIntents.id)
    .notNull(),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: varchar('currency').notNull(),
  status: varchar('status').notNull(),
  paymentMethod: varchar('paymentMethod').notNull(),
  receiptEmail: varchar('receiptEmail'),
  receiptUrl: varchar('receiptUrl'),
  failureMessage: varchar('failureMessage'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
