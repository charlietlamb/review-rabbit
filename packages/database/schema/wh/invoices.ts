import {
  pgTable,
  varchar,
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
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId')
    .references(() => customers.id)
    .notNull(),
  subscriptionId: varchar('subscriptionId').references(() => subscriptions.id),
  paymentIntentId: varchar('paymentIntentId').references(
    () => paymentIntents.id
  ),
  status: varchar('status').notNull(),
  currency: varchar('currency').notNull(),
  amountDue: decimal('amountDue', { precision: 32, scale: 2 }).notNull(),
  amountPaid: decimal('amountPaid', { precision: 32, scale: 2 }).notNull(),
  amountRemaining: decimal('amountRemaining', {
    precision: 32,
    scale: 2,
  }).notNull(),
  subtotal: decimal('subtotal', { precision: 32, scale: 2 }).notNull(),
  total: decimal('total', { precision: 32, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 32, scale: 2 }),
  billingReason: varchar('billingReason'),
  collectionMethod: varchar('collectionMethod'),
  description: varchar('description'),
  dueDate: timestamp('dueDate'),
  paid: boolean('paid').default(false),
  paidAt: timestamp('paidAt'),
  voidedAt: timestamp('voidedAt'),
  sentAt: timestamp('sentAt'),
  periodStart: timestamp('periodStart'),
  periodEnd: timestamp('periodEnd'),
  receiptNumber: varchar('receiptNumber'),
  statementDescriptor: varchar('statementDescriptor'),
  requiresAction: boolean('requiresAction').default(false),
  lastPaymentError: jsonb('lastPaymentError').default({}),
  nextPaymentAttempt: timestamp('nextPaymentAttempt'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
