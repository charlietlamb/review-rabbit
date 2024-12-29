import {
  pgTable,
  text,
  timestamp,
  jsonb,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { charges } from './charges'
import { users } from '../auth/users'

export const chargeDisputes = pgTable('wh_charge_disputes', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  chargeId: text('chargeId')
    .references(() => charges.id)
    .notNull(),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  reason: text('reason'),
  evidenceDueBy: timestamp('evidenceDueBy'),
  isRefunded: boolean('isRefunded').default(false),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
