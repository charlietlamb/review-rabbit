import { pgTable, varchar, timestamp, jsonb } from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { subscriptions } from './subscriptions'
import { users } from '../auth/users'

export const subscriptionSchedules = pgTable('wh_subscription_schedules', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId')
    .references(() => customers.id)
    .notNull(),
  subscriptionId: varchar('subscriptionId').references(() => subscriptions.id),
  status: varchar('status').notNull(),
  phases: jsonb('phases'),
  currentPhase: jsonb('currentPhase'),
  defaultSettings: jsonb('defaultSettings'),
  endBehavior: varchar('endBehavior'),
  releasedAt: timestamp('releasedAt'),
  releasedSubscription: jsonb('releasedSubscription'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
