import { z } from 'zod'

export const invoiceValidationSchema = z.object({
  clientId: z.string().min(1),
  amount: z.number().min(0),
  dueDate: z.coerce.date(),
  reference: z.string().optional(),
})

export type InvoiceFormData = z.infer<typeof invoiceValidationSchema>
