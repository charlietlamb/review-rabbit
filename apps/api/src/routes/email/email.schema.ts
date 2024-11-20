import { z } from 'zod'

export const emailResponseSchema = z.object({
  success: z.boolean(),
})
