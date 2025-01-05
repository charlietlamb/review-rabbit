import { pgTable, text, boolean, timestamp } from 'drizzle-orm/pg-core'
import { automations } from './automations'
import { clients } from './clients'
export const automationItems = pgTable('automation_items', {
  id: text('id').primaryKey(),
  automationId: text('automation_id').references(() => automations.id),
  clientId: text('client_id').references(() => clients.id),
  method: text('method').notNull(),
  content: text('content').notNull(),
  clicked: boolean('clicked').notNull().default(false),
  time: timestamp('time').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type AutomationItem = typeof automationItems.$inferSelect
