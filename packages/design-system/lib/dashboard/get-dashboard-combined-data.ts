import { DashboardData } from '@remio/design-system/components/dashboard/overview/overview-types'
import { z } from 'zod'
import { eachDayOfInterval, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

export const combinedDataSchema = z.object({
  date: z.string(),
  clients: z.number(),
  revenue: z.number(),
})

export type CombinedData = z.infer<typeof combinedDataSchema>

export function getDashboardCombinedData(
  data: DashboardData,
  dateRange: DateRange | undefined
): CombinedData[] {
  if (!dateRange || !dateRange.from || !dateRange.to) return []
  const aggregatedClientData = new Map<string, number>()
  const aggregatedInvoiceData = new Map<string, number>()

  data.clientData.forEach((item) => {
    const currentValue = aggregatedClientData.get(item.date) || 0
    aggregatedClientData.set(item.date, currentValue + item.clients)
  })

  data.invoiceData.forEach((item) => {
    const currentValue = aggregatedInvoiceData.get(item.date) || 0
    aggregatedInvoiceData.set(item.date, currentValue + item.amount)
  })

  const dates = eachDayOfInterval({
    start: dateRange.from,
    end: dateRange.to,
  })

  return dates.map((date) => {
    const formattedDate = format(date, 'yyyy-MM-dd')
    return {
      date: formattedDate,
      clients: aggregatedClientData.get(formattedDate) ?? 0,
      revenue: aggregatedInvoiceData.get(formattedDate) ?? 0,
    }
  })
}
