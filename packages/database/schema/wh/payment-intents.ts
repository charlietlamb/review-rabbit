import {
  pgTable,
  text,
  timestamp,
  jsonb,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { users } from '../auth/users'

export const paymentIntents = pgTable('wh_payment_intents', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  paymentMethod: text('paymentMethod'),
  description: text('description'),
  canceledAt: timestamp('canceledAt'),
  capturedAt: timestamp('capturedAt'),
  paidAt: timestamp('paidAt'),
  confirmationMethod: text('confirmationMethod'),
  requiresAction: boolean('requiresAction').default(false),
  requiresCapture: boolean('requiresCapture').default(false),
  setupFutureUsage: text('setupFutureUsage'),
  lastPaymentError: jsonb('lastPaymentError').default('{}'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
