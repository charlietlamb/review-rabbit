import {
  integer,
  pgTable,
  timestamp,
  varchar,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'

export const subscriptions = pgTable('wh_subscriptions', {
  id: varchar('id').primaryKey(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId')
    .references(() => customers.id)
    .notNull(),
  status: varchar('status').notNull(),
  priceId: varchar('priceId').notNull(),
  quantity: integer('quantity').notNull(),
  cancelAtPeriodEnd: boolean('cancelAtPeriodEnd').notNull().default(false),
  cancelAt: timestamp('cancelAt'),
  canceledAt: timestamp('canceledAt'),
  currentPeriodStart: timestamp('currentPeriodStart').notNull(),
  currentPeriodEnd: timestamp('currentPeriodEnd').notNull(),
  endedAt: timestamp('endedAt'),
  trialStart: timestamp('trialStart'),
  trialEnd: timestamp('trialEnd'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
