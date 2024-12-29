import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { payments } from './payments'
import { users } from '../auth/users'

export const charges = pgTable('wh_charges', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId')
    .references(() => customers.id)
    .notNull(),
  paymentId: varchar('paymentId').references(() => payments.id),
  amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
  currency: varchar('currency').notNull(),
  status: varchar('status').notNull(),
  paymentMethod: varchar('paymentMethod').notNull(),
  description: varchar('description'),
  failureCode: varchar('failureCode'),
  failureMessage: varchar('failureMessage'),
  disputed: boolean('disputed').default(false),
  refunded: boolean('refunded').default(false),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
