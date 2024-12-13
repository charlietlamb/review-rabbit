import { z } from 'zod'

export const invoicesChartRequestSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
})

export type InvoicesChartRequest = z.infer<typeof invoicesChartRequestSchema>

export const invoicesChartSchema = z.array(
  z.object({
    date: z.string(),
    amount: z.number(),
  })
)
export type InvoicesChart = z.infer<typeof invoicesChartSchema>
