import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  decimal,
} from 'drizzle-orm/pg-core'
import { stripeConnects } from '../stripe/stripe-connects'
import { users } from '../auth/users'

export const payouts = pgTable('wh_payouts', {
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
  status: varchar('status').notNull(),
  type: varchar('type').notNull(),
  method: varchar('method').notNull(),
  bankAccount: jsonb('bankAccount'),
  failureCode: varchar('failureCode'),
  failureMessage: varchar('failureMessage'),
  arrivalDate: timestamp('arrivalDate'),
  paidAt: timestamp('paidAt'),
  canceledAt: timestamp('canceledAt'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
