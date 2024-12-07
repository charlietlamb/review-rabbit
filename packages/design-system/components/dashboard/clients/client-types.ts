import { z } from 'zod'

export const clientsChartSchema = z.array(
  z.object({
    date: z.string(),
    clients: z.number(),
  })
)

export type ClientsChart = z.infer<typeof clientsChartSchema>
