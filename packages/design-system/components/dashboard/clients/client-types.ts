import { z } from 'zod'

export const clientChartsRequestSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
})

export type ClientChartsRequest = z.infer<typeof clientChartsRequestSchema>

export const clientsChartSchema = z.array(
  z.object({
    date: z.string(),
    clients: z.number(),
  })
)

export type ClientsChart = z.infer<typeof clientsChartSchema>
