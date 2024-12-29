import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  decimal,
} from 'drizzle-orm/pg-core'
import { charges } from './charges'
import { users } from '../auth/users'

export const refunds = pgTable('wh_refunds', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  chargeId: varchar('chargeId')
    .references(() => charges.id)
    .notNull(),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: varchar('currency').notNull(),
  status: varchar('status').notNull(),
  reason: varchar('reason'),
  receiptNumber: varchar('receiptNumber'),
  failureReason: varchar('failureReason'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
