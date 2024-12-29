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
import { users } from '../auth/users'

export const invoices = pgTable('wh_invoices', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  subscriptionId: text('subscriptionId').references(() => subscriptions.id),
  paymentIntentId: text('paymentIntentId').references(() => paymentIntents.id),
  status: text('status').notNull(),
  currency: text('currency').notNull(),
  amountDue: decimal('amountDue', { precision: 32, scale: 2 }).notNull(),
  amountPaid: decimal('amountPaid', { precision: 32, scale: 2 }).notNull(),
  amountRemaining: decimal('amountRemaining', {
    precision: 32,
    scale: 2,
  }).notNull(),
  subtotal: decimal('subtotal', { precision: 32, scale: 2 }).notNull(),
  total: decimal('total', { precision: 32, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 32, scale: 2 }),
  billingReason: text('billingReason'),
  collectionMethod: text('collectionMethod'),
  description: text('description'),
  dueDate: timestamp('dueDate'),
  paid: boolean('paid').default(false),
  paidAt: timestamp('paidAt'),
  voidedAt: timestamp('voidedAt'),
  sentAt: timestamp('sentAt'),
  periodStart: timestamp('periodStart'),
  periodEnd: timestamp('periodEnd'),
  receiptNumber: text('receiptNumber'),
  statementDescriptor: text('statementDescriptor'),
  requiresAction: boolean('requiresAction').default(false),
  lastPaymentError: jsonb('lastPaymentError').default({}),
  nextPaymentAttempt: timestamp('nextPaymentAttempt'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
