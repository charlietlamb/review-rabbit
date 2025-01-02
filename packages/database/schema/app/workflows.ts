import { pgTable, text } from 'drizzle-orm/pg-core'
import { workflowItems, workflowItem } from './workflow-items'
import { relations } from 'drizzle-orm'
import { z } from 'zod'
import { createSelectSchema } from 'drizzle-zod'

export const workflows = pgTable('workflows', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
})

export const workflow = createSelectSchema(workflows)
export type Workflow = typeof workflow

export const workflowRelations = relations(workflows, ({ many }) => ({
  items: many(workflowItems),
}))

export const workflowWithItems = workflow.extend({
  items: z.array(workflowItem),
})

export type WorkflowWithItems = z.infer<typeof workflowWithItems>
