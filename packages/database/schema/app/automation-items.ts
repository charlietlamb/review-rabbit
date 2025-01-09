import { pgTable, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { automations } from './automations'
import { clients } from './clients'
import { users } from '../auth/users'
import { relations } from 'drizzle-orm'
import { workflowItems } from './workflow-items'

export const automationItems = pgTable('automation_items', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  automationId: text('automation_id')
    .references(() => automations.id)
    .notNull(),
  clientId: text('client_id')
    .references(() => clients.id)
    .notNull(),
  workflowItemId: text('workflow_item_id')
    .references(() => workflowItems.id)
    .notNull(),
  scheduledFor: timestamp('scheduled_for').notNull(),
  taskId: text('task_id').notNull(),
  clicked: boolean('clicked').notNull().default(false),
  delayInMinutes: integer('delay_in_minutes').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type AutomationItem = typeof automationItems.$inferSelect
export type AutomationItemInsert = typeof automationItems.$inferInsert

export const automationItemsRelations = relations(
  automationItems,
  ({ one }) => ({
    automation: one(automations, {
      fields: [automationItems.automationId],
      references: [automations.id],
    }),
    user: one(users, {
      fields: [automationItems.userId],
      references: [users.id],
    }),
    client: one(clients, {
      fields: [automationItems.clientId],
      references: [clients.id],
    }),
    workflowItem: one(workflowItems, {
      fields: [automationItems.workflowItemId],
      references: [workflowItems.id],
    }),
  })
)
