import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { customerPaymentMethods } from './customer-payment-methods'
import { users } from '../auth/users'

export const setupIntents = pgTable('wh_setup_intents', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId')
    .references(() => customers.id)
    .notNull(),
  paymentMethodId: varchar('paymentMethodId').references(
    () => customerPaymentMethods.id
  ),
  status: varchar('status').notNull(),
  usage: varchar('usage'),
  paymentMethodTypes: jsonb('paymentMethodTypes'),
  clientSecret: varchar('clientSecret'),
  description: varchar('description'),
  lastSetupError: jsonb('lastSetupError'),
  nextAction: jsonb('nextAction'),
  paymentMethodOptions: jsonb('paymentMethodOptions'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
