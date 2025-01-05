import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { workflows } from './workflows'
import { relations } from 'drizzle-orm'

export const workflowItems = pgTable('workflow_items', {
  id: text('id').primaryKey(),
  workflowId: text('workflow_id').references(() => workflows.id, {
    onDelete: 'cascade',
  }),
  content: text('content').notNull(),
  type: text('type').notNull(),
  x: integer('x').notNull(),
  y: integer('y').notNull(),
  time: integer('time').notNull(),
  level: integer('level').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const workflowItemsRelations = relations(workflowItems, ({ one }) => ({
  workflow: one(workflows, {
    fields: [workflowItems.workflowId],
    references: [workflows.id],
  }),
}))