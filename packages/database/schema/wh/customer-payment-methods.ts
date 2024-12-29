import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { users } from '../auth/users'

export const customerPaymentMethods = pgTable('wh_customer_payment_methods', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId')
    .references(() => customers.id)
    .notNull(),
  type: varchar('type').notNull(),
  status: varchar('status').notNull(),
  billingDetails: jsonb('billingDetails'),
  card: jsonb('card'),
  isDefault: boolean('isDefault').default(false),
  expiresAt: timestamp('expiresAt'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
