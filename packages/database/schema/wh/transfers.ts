import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  decimal,
} from 'drizzle-orm/pg-core'
import { stripeConnects } from '../stripe/stripe-connects'
import { charges } from './charges'
import { users } from '../auth/users'

export const transfers = pgTable('wh_transfers', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  stripeConnectId: varchar('stripeConnectId')
    .references(() => stripeConnects.id)
    .notNull(),
  chargeId: varchar('chargeId').references(() => charges.id),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: varchar('currency').notNull(),
  description: varchar('description'),
  destinationPayment: varchar('destinationPayment'),
  reversals: jsonb('reversals'),
  balanceTransaction: jsonb('balanceTransaction'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
