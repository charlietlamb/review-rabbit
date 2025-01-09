import { z } from 'zod'
import { clientSchema } from '@rabbit/database/schema/app/clients'

export const clientAutomation = z.object({
  client: clientSchema,
  automationItemId: z.string(),
})

export type ClientAutomation = z.infer<typeof clientAutomation>
