import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'
import { businesses } from './businesses'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { automationItems } from './automation-items'

export const automations = pgTable('automations', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  businessId: text('business_id')
    .references(() => businesses.id)
    .notNull(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type Automation = typeof automations.$inferSelect

export const automationsRelations = relations(automations, ({ one, many }) => ({
  business: one(businesses, {
    fields: [automations.businessId],
    references: [businesses.id],
  }),
  user: one(users, {
    fields: [automations.userId],
    references: [users.id],
  }),
  items: many(automationItems),
}))
