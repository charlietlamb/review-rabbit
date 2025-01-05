import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'
import { businesses } from './businesses'
import { relations } from 'drizzle-orm'
import { z } from 'zod'
export const automations = pgTable('automations', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  businessId: text('business_id').references(() => businesses.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type Automation = typeof automations.$inferSelect

export const automationsRelations = relations(automations, ({ one }) => ({
  business: one(businesses, {
    fields: [automations.businessId],
    references: [businesses.id],
  }),
  user: one(users, {
    fields: [automations.userId],
    references: [users.id],
  }),
}))
