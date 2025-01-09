import { z } from 'zod'
import { createSelectSchema } from 'drizzle-zod'
import { automations } from '../schema/app/automations'
import { automationItems } from '../schema/app/automation-items'
import { businessSelectSchema } from '../schema/app/businesses'
import { clientSchema } from '../schema/app/clients'
import { workflowItem } from '../types/workflow-types'

export const automationItem = createSelectSchema(automationItems)
export type AutomationItem = typeof automationItem

export const automation = createSelectSchema(automations)
export type Automation = typeof automation

export const automationWithItems = automation.extend({
  items: z.array(automationItem),
  business: businessSelectSchema,
})

export type AutomationWithItems = z.infer<typeof automationWithItems>

export const automationItemWithData = automationItem.extend({
  client: clientSchema,
  workflowItem: workflowItem,
})

export const automationItemPartial = automationItem.partial()
export type AutomationItemPartial = z.infer<typeof automationItemPartial>

export const automationFormSchema = z.object({
  clientIds: z.array(z.string().uuid()),
  businessId: z.string().uuid(),
  workflowId: z.string().uuid(),
  title: z.string(),
})

export type AutomationForm = z.infer<typeof automationFormSchema>
