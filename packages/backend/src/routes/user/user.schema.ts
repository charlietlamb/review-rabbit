import { z } from 'zod'

export const updateUserSchema = z.object({
  form: z.object({
    name: z.string(),
    email: z.string(),
  }),
  session: z.string(),
})
