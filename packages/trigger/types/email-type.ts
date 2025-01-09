import { z } from 'zod'
import { clientAutomation } from './task-types'
export const emailTaskType = clientAutomation.extend({
  to: z.array(z.string()),
  subject: z.string(),
  content: z.string(),
})

export type EmailTaskType = z.infer<typeof emailTaskType>
