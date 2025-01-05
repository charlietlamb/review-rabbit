import { pgTable, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { automations } from './automations'
import { clients } from './clients'

export const automationItems = pgTable('automation_items', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  automationId: text('automation_id')
    .references(() => automations.id)
    .notNull(),
  clientId: text('client_id')
    .references(() => clients.id)
    .notNull(),
  taskId: text('task_id').notNull(),
  method: text('method').notNull(),
  type: text('type').notNull(),
  content: text('content').notNull(),
  clicked: boolean('clicked').notNull().default(false),
  delayInMinutes: integer('delay_in_minutes').notNull(),
  time: timestamp('time').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type AutomationItem = typeof automationItems.$inferSelect
export type AutomationItemInsert = typeof automationItems.$inferInsert
