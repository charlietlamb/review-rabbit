import { pgTable, text, timestamp, jsonb, decimal } from 'drizzle-orm/pg-core'
import { stripeConnects } from '../stripe/stripe-connects'
import { users } from '../auth/users'

export const payouts = pgTable('wh_payouts', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  stripeConnectId: text('stripeConnectId')
    .references(() => stripeConnects.id)
    .notNull(),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  type: text('type').notNull(),
  method: text('method').notNull(),
  bankAccount: jsonb('bankAccount'),
  failureCode: text('failureCode'),
  failureMessage: text('failureMessage'),
  arrivalDate: timestamp('arrivalDate'),
  paidAt: timestamp('paidAt'),
  canceledAt: timestamp('canceledAt'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
