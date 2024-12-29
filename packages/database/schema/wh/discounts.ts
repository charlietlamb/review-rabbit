import {
  pgTable,
  varchar,
  timestamp,
  jsonb,
  decimal,
  integer,
  text,
} from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { users } from '../auth/users'

export const discounts = pgTable('wh_discounts', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  couponId: text('couponId'),
  promotionCodeId: text('promotionCodeId'),
  start: timestamp('start').notNull(),
  end: timestamp('end'),
  currency: text('currency'),
  amountOff: decimal('amountOff', { precision: 32, scale: 2 }),
  percentOff: decimal('percentOff', { precision: 5, scale: 2 }),
  duration: text('duration').notNull(),
  durationInMonths: integer('durationInMonths'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
