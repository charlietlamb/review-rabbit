import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { workflowItems, workflowItem } from './workflow-items'
import { relations } from 'drizzle-orm'
import { z } from 'zod'
import { createSelectSchema } from 'drizzle-zod'
import { users } from '../auth/users'

export const workflows = pgTable('workflows', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const workflow = createSelectSchema(workflows)
export type Workflow = typeof workflow

export const workflowRelations = relations(workflows, ({ many, one }) => ({
  items: many(workflowItems),
  user: one(users, {
    fields: [workflows.userId],
    references: [users.id],
  }),
}))

export const workflowWithItems = workflow.extend({
  items: z.array(workflowItem),
})

export type WorkflowWithItems = z.infer<typeof workflowWithItems>

export const workflowFormSchema = z.object({
  name: z.string(),
  items: z.array(
    workflowItem
      .pick({
        id: true,
        content: true,
        type: true,
        x: true,
        y: true,
        time: true,
      })
      .partial({ id: true })
  ),
})

export type WorkflowForm = z.infer<typeof workflowFormSchema>
