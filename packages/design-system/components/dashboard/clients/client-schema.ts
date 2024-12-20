import { colorSchema } from '@remio/design-system/components/form/color/color-picker'
import { z } from 'zod'

export const clientValidationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().nullable().optional(),
  color: z.string().min(1),
})

export type ClientFormData = z.infer<typeof clientValidationSchema>
