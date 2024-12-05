import { OAuthProvider, ScheduleHandlers } from '@ff/hono/connect/types'
import { z } from 'zod'

export const scheduleContentSchema = z.object({
  scheduledTime: z.string().datetime(),
  mediaUrl: z.string().url(),
  caption: z.string().optional(),
})

export type ScheduleContent = z.infer<typeof scheduleContentSchema>
