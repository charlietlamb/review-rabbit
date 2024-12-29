import {
  pgTable,
  varchar,
  timestamp,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core'
import { users } from '../auth/users'

export const taxRates = pgTable('wh_tax_rates', {
  id: varchar('id').primaryKey(),
  userId: varchar('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: varchar('stripeId').unique().notNull(),
  displayName: varchar('displayName').notNull(),
  description: varchar('description'),
  jurisdiction: varchar('jurisdiction'),
  percentage: decimal('percentage', { precision: 6, scale: 4 }).notNull(),
  inclusive: boolean('inclusive').default(false),
  active: boolean('active').default(true),
  country: varchar('country'),
  state: varchar('state'),
  taxType: varchar('taxType'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
