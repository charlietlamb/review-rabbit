import { businessSelectSchema, clientSchema } from '@rabbit/database'
import { z } from 'zod'

export const emailTaskType = z.object({
  to: z.array(z.string()),
  subject: z.string(),
  content: z.string(),
  client: clientSchema,
  business: businessSelectSchema,
  delayInMinutes: z.number().optional(),
})

export type EmailTaskType = z.infer<typeof emailTaskType>
