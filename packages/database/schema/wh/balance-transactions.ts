import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  decimal,
} from 'drizzle-orm/pg-core'
import { stripeConnects } from '../stripe/stripe-connects'
import { users } from '../auth/users'

export const balanceTransactions = pgTable('wh_balance_transactions', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  stripeConnectId: varchar('stripeConnectId')
    .references(() => stripeConnects.id)
    .notNull(),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: varchar('currency').notNull(),
  type: varchar('type').notNull(),
  status: varchar('status').notNull(),
  description: varchar('description'),
  fee: decimal('fee', { precision: 32, scale: 2 }),
  net: decimal('net', { precision: 32, scale: 2 }),
  availableOn: timestamp('availableOn'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
