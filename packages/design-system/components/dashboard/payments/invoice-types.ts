import { z } from 'zod'

export const invoicesChartSchema = z.array(
  z.object({
    date: z.string(),
    invoices: z.number(),
    payments: z.number(),
    amount: z.number(),
  })
)

export type InvoicesChart = z.infer<typeof invoicesChartSchema>
