import { z } from 'zod'

export const updateUserSchema = z.object({
  form: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string().url().optional(),
  }),
  session: z.string(),
})
