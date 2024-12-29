import { pgTable, text, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { StripeEventType } from '@burse/webhooks/constants/stripe-events'
import { users } from '../auth/users'

export const events = pgTable('wh_events', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  type: text('type').notNull(),
  data: jsonb('data').notNull(),
  stripeAccountId: text('stripeAccountId'),
  stripeEventId: text('stripeEventId').unique(),
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
