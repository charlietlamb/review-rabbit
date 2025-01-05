import { z } from 'zod'

export const emailTaskType = z.object({
  to: z.array(z.string()),
  subject: z.string(),
  body: z.string(),
  delayInMinutes: z.number().optional(),
})

export type EmailTaskType = z.infer<typeof emailTaskType>
