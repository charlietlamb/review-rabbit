import { pgTable, text, boolean, timestamp } from 'drizzle-orm/pg-core'
import { automations } from './automations'

export const automationItems = pgTable('automation_items', {
  id: text('id').primaryKey(),
  automationId: text('automation_id').references(() => automations.id),
  method: text('method').notNull(),
  clicked: boolean('clicked').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type AutomationItem = typeof automationItems.$inferSelect
