import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { users } from '../auth/users'

export const paymentIntents = pgTable('wh_payment_intents', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId')
    .references(() => customers.id)
    .notNull(),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: varchar('currency').notNull(),
  status: varchar('status').notNull(),
  paymentMethod: varchar('paymentMethod'),
  description: varchar('description'),
  canceledAt: timestamp('canceledAt'),
  capturedAt: timestamp('capturedAt'),
  paidAt: timestamp('paidAt'),
  confirmationMethod: varchar('confirmationMethod'),
  requiresAction: boolean('requiresAction').default(false),
  requiresCapture: boolean('requiresCapture').default(false),
  setupFutureUsage: varchar('setupFutureUsage'),
  lastPaymentError: jsonb('lastPaymentError').default('{}'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
