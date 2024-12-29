import {
  pgTable,
  text,
  timestamp,
  jsonb,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'

export const subscriptions = pgTable('wh_subscriptions', {
  id: text('id').primaryKey(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  status: text('status').notNull(),
  priceId: text('priceId').notNull(),
  quantity: decimal('quantity', { precision: 32, scale: 2 }).notNull(),
  cancelAtPeriodEnd: boolean('cancelAtPeriodEnd').default(false),
  cancelAt: timestamp('cancelAt'),
  canceledAt: timestamp('canceledAt'),
  currentPeriodStart: timestamp('currentPeriodStart'),
  currentPeriodEnd: timestamp('currentPeriodEnd'),
  endedAt: timestamp('endedAt'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
