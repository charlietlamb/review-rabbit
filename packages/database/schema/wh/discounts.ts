import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  decimal,
  integer,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { users } from '../auth/users'

export const discounts = pgTable('wh_discounts', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  customerId: varchar('customerId')
    .references(() => customers.id)
    .notNull(),
  couponId: varchar('couponId'),
  promotionCodeId: varchar('promotionCodeId'),
  start: timestamp('start').notNull(),
  end: timestamp('end'),
  currency: varchar('currency'),
  amountOff: decimal('amountOff', { precision: 32, scale: 2 }),
  percentOff: decimal('percentOff', { precision: 5, scale: 2 }),
  duration: varchar('duration').notNull(),
  durationInMonths: integer('durationInMonths'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
