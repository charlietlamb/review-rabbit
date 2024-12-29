import { pgTable, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { StripeEventType } from '@burse/webhooks/constants/stripe-events'
import { users } from '../auth/users'

export const events = pgTable('wh_events', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  type: varchar('type').notNull(),
  data: jsonb('data').notNull(),
  stripeAccountId: varchar('stripeAccountId'),
  stripeEventId: varchar('stripeEventId').unique(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  processedAt: timestamp('processedAt'),
  error: jsonb('error'),
})

export type Event = typeof events.$inferSelect

export interface StripeEvent extends Event {
  type: StripeEventType
  stripeEventId: string
  data: Record<string, any>
}
