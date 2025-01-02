import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { subscriptions } from './subscriptions'

export const subscriptionSchedules = pgTable('subscription_schedules', {
  id: text('id').primaryKey().notNull(),
  subscriptionId: text('subscription_id')
    .references(() => subscriptions.id)
    .notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
