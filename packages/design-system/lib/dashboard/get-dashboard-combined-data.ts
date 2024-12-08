import { DashboardData } from '@remio/design-system/components/dashboard/overview/overview-types'
import { z } from 'zod'

export const combinedDataSchema = z.object({
  date: z.string(),
  clients: z.number(),
  revenue: z.number(),
})
export type CombinedData = z.infer<typeof combinedDataSchema>

export function getDashboardCombinedData(data: DashboardData) {
  return data.clientData.map((client) => {
    return {
      date: client.date,
      clients: client.clients,
      revenue:
        data.invoiceData.find((invoice) => invoice.date === client.date)
          ?.payments ?? 0,
    }
  })
}
