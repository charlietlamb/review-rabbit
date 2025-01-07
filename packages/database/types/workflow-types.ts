import { z } from 'zod'
import { createSelectSchema } from 'drizzle-zod'
import { workflows } from '../schema/app/workflows'
import { workflowItems } from '../schema/app/workflow-items'

export const workflowItem = createSelectSchema(workflowItems)
export type WorkflowItem = typeof workflowItems.$inferSelect

export const workflow = createSelectSchema(workflows)
export type Workflow = typeof workflows.$inferSelect

export const workflowWithItems = workflow.extend({
  items: z.array(workflowItem),
})

export type WorkflowWithItems = z.infer<typeof workflowWithItems>

export const workflowFormSchema = z.object({
  title: z.string(),
  items: z.array(
    workflowItem
      .pick({
        id: true,
        content: true,
        type: true,
        method: true,
        x: true,
        y: true,
        time: true,
        level: true,
      })
      .partial({ id: true })
  ),
})

export type WorkflowForm = z.infer<typeof workflowFormSchema>
