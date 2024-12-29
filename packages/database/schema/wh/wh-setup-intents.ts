import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core'
import { stripeConnects } from '../stripe/stripe-connects'
import { users } from '../auth/users'

export const whSetupIntents = pgTable('wh_setup_intents', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  stripeConnectId: uuid('stripe_connect_id')
    .notNull()
    .references(() => stripeConnects.id),
  stripeSetupIntentId: text('stripe_setup_intent_id').notNull().unique(),
  status: text('status').notNull(),
  paymentMethodTypes: jsonb('payment_method_types').$type<string[]>().notNull(),
  usage: text('usage'),
  clientSecret: text('client_secret'),
  description: text('description'),
  lastSetupError: jsonb('last_setup_error').$type<{
    code?: string
    message: string
    type: string
  } | null>(),
  latestAttempt: text('latest_attempt'),
  nextAction: jsonb('next_action').$type<Record<string, any> | null>(),
  paymentMethod: text('payment_method'),
  paymentMethodOptions: jsonb('payment_method_options').$type<Record<
    string,
    any
  > | null>(),
  metadata: jsonb('metadata').$type<Record<string, any> | null>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  canceledAt: timestamp('canceled_at'),
  cancellationReason: text('cancellation_reason'),
})
