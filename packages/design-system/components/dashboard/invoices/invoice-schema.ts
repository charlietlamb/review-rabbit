import { z } from 'zod'

export const invoiceValidationSchema = z.object({
  clientId: z.string().min(1),
  amount: z.number().min(0),
  dueDate: z.date(),
})

export type InvoiceFormData = z.infer<typeof invoiceValidationSchema>
