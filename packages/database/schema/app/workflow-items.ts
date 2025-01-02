import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { workflows } from './workflows'
import { createSelectSchema } from 'drizzle-zod'

export const workflowItems = pgTable('workflow_items', {
  id: text('id').primaryKey(),
  workflowId: text('workflow_id').references(() => workflows.id),
  content: text('content').notNull(),
  type: text('type').notNull(),
  x: integer('x').notNull(),
  y: integer('y').notNull(),
  time: integer('time').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const workflowItem = createSelectSchema(workflowItems)
export type WorkflowItem = typeof workflowItem
