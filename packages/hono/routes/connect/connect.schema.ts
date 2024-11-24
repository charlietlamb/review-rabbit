import { z } from 'zod'

export const connectSchema = z.object({
  code: z.string().optional(),
  error: z.string().optional(),
  errorMessage: z.string().optional(),
  state: z.string().optional(),
})
