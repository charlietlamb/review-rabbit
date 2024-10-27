import { z } from 'zod'

export const updateUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().url().optional(),
})
