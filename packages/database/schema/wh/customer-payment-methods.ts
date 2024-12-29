import { pgTable, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { users } from '../auth/users'

export const customerPaymentMethods = pgTable('wh_customer_payment_methods', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  type: text('type').notNull(),
  status: text('status').notNull(),
  billingDetails: jsonb('billingDetails'),
  card: jsonb('card'),
  isDefault: boolean('isDefault').default(false),
  expiresAt: timestamp('expiresAt'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
