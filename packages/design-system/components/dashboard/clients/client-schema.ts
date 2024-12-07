import { z } from 'zod'

export const clientValidationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().nullable().optional(),
})

export type ClientFormData = z.infer<typeof clientValidationSchema>
