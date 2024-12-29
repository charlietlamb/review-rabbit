import { pgTable, text, timestamp, jsonb, decimal } from 'drizzle-orm/pg-core'
import { stripeConnects } from '../stripe/stripe-connects'
import { users } from '../auth/users'

export const balanceTransactions = pgTable('wh_balance_transactions', {
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
  type: text('type').notNull(),
  status: text('status').notNull(),
  description: text('description'),
  fee: decimal('fee', { precision: 32, scale: 2 }),
  net: decimal('net', { precision: 32, scale: 2 }),
  availableOn: timestamp('availableOn'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
