import {
  pgTable,
  text,
  timestamp,
  jsonb,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { payments } from './payments'
import { users } from '../auth/users'

export const charges = pgTable('wh_charges', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  paymentId: text('paymentId').references(() => payments.id),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  paymentMethod: text('paymentMethod').notNull(),
  description: text('description'),
  failureCode: text('failureCode'),
  failureMessage: text('failureMessage'),
  disputed: boolean('disputed').default(false),
  refunded: boolean('refunded').default(false),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
