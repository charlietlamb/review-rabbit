import {
  pgTable,
  text,
  timestamp,
  jsonb,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { paymentIntents } from './payment-intents'
import { users } from '../auth/users'

export const checkoutSessions = pgTable('wh_checkout_sessions', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId').references(() => customers.id),
  paymentIntentId: text('paymentIntentId').references(() => paymentIntents.id),
  status: text('status').notNull(),
  mode: text('mode').notNull(),
  currency: text('currency').notNull(),
  amountTotal: decimal('amountTotal', { precision: 32, scale: 2 }),
  amountSubtotal: decimal('amountSubtotal', { precision: 32, scale: 2 }),
  paymentStatus: text('paymentStatus'),
  url: text('url'),
  expiresAt: timestamp('expiresAt'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
