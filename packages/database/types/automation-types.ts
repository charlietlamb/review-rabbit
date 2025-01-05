import { z } from 'zod'
import { createSelectSchema } from 'drizzle-zod'
import { automations } from '../schema/app/automations'
import { automationItems } from '../schema/app/automation-items'

export const automationItem = createSelectSchema(automationItems)
export type AutomationItem = typeof automationItem

export const automation = createSelectSchema(automations)
export type Automation = typeof automation

export const automationWithItems = automation.extend({
  items: z.array(automationItem),
})

export type AutomationWithItems = z.infer<typeof automationWithItems>

export const automationFormSchema = z.object({
  clientIds: z.array(z.string().uuid()),
  businessId: z.string().uuid(),
  workflowId: z.string().uuid(),
  title: z.string(),
})

export type AutomationForm = z.infer<typeof automationFormSchema>
