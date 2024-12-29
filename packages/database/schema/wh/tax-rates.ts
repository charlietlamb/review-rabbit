import { pgTable, text, timestamp, decimal, boolean } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'

export const taxRates = pgTable('wh_tax_rates', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  stripeId: text('stripeId').unique().notNull(),
  displayName: text('displayName').notNull(),
  description: text('description'),
  jurisdiction: text('jurisdiction'),
  percentage: decimal('percentage', { precision: 6, scale: 4 }).notNull(),
  inclusive: boolean('inclusive').default(false),
  active: boolean('active').default(true),
  country: text('country'),
  state: text('state'),
  taxType: text('taxType'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})
