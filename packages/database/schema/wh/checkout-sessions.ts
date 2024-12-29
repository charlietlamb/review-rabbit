import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { paymentIntents } from './payment-intents'
import { users } from '../auth/users'

export const checkoutSessions = pgTable('wh_checkout_sessions', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId').references(() => customers.id),
  paymentIntentId: varchar('paymentIntentId').references(
    () => paymentIntents.id
  ),
  status: varchar('status').notNull(),
  mode: varchar('mode').notNull(),
  currency: varchar('currency').notNull(),
  amountTotal: decimal('amountTotal', { precision: 32, scale: 2 }),
  amountSubtotal: decimal('amountSubtotal', { precision: 32, scale: 2 }),
  paymentStatus: varchar('paymentStatus'),
  url: varchar('url'),
  expiresAt: timestamp('expiresAt'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
