import { pgTable, text, timestamp, jsonb, decimal } from 'drizzle-orm/pg-core'
import { stripeConnects } from '../stripe/stripe-connects'
import { charges } from './charges'
import { users } from '../auth/users'

export const transfers = pgTable('wh_transfers', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  stripeConnectId: text('stripeConnectId')
    .references(() => stripeConnects.id)
    .notNull(),
  chargeId: text('chargeId').references(() => charges.id),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  description: text('description'),
  destinationPayment: text('destinationPayment'),
  reversals: jsonb('reversals'),
  balanceTransaction: jsonb('balanceTransaction'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
