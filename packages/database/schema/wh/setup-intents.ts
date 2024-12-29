import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { customerPaymentMethods } from './customer-payment-methods'
import { users } from '../auth/users'

export const setupIntents = pgTable('wh_setup_intents', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  paymentMethodId: text('paymentMethodId').references(
    () => customerPaymentMethods.id
  ),
  status: text('status').notNull(),
  usage: text('usage'),
  paymentMethodTypes: jsonb('paymentMethodTypes'),
  clientSecret: text('clientSecret'),
  description: text('description'),
  lastSetupError: jsonb('lastSetupError'),
  nextAction: jsonb('nextAction'),
  paymentMethodOptions: jsonb('paymentMethodOptions'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
