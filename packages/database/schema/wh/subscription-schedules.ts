import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { subscriptions } from './subscriptions'
import { users } from '../auth/users'

export const subscriptionSchedules = pgTable('wh_subscription_schedules', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  subscriptionId: text('subscriptionId').references(() => subscriptions.id),
  status: text('status').notNull(),
  phases: jsonb('phases'),
  currentPhase: jsonb('currentPhase'),
  defaultSettings: jsonb('defaultSettings'),
  endBehavior: text('endBehavior'),
  releasedAt: timestamp('releasedAt'),
  releasedSubscription: jsonb('releasedSubscription'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
