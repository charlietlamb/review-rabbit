import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { users } from '../auth/users'

export const whSetupIntents = pgTable('wh_setup_intents', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  status: text('status').notNull(),
  clientSecret: text('clientSecret'),
  description: text('description'),
  paymentMethodTypes: jsonb('paymentMethodTypes'),
  usage: text('usage'),
  lastSetupError: jsonb('lastSetupError'),
  nextAction: jsonb('nextAction'),
  paymentMethodOptions: jsonb('paymentMethodOptions'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
