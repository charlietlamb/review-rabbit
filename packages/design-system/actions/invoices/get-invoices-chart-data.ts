'use server'

import client from '@remio/design-system/lib/client'
import { InvoicesChart } from '@remio/design-system/components/dashboard/invoices/invoice-types'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import { eachDayOfInterval, format } from 'date-fns'

export async function getInvoicesChartData(
  startDate: Date,
  endDate: Date
): Promise<InvoicesChart> {
  const response = await client.invoices.chart.$post(
    {
      json: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch invoices chart data')
  }
  const invoicesResults = await response.json()

  const invoiceAmountMap = new Map<string, number>()
  invoicesResults.forEach((result: { date: string; amount: number }) => {
    invoiceAmountMap.set(result.date, result.amount)
  })

  const dates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  return dates.map((date) => {
    const formattedDate = format(date, 'yyyy-MM-dd')
    return {
      date: formattedDate,
      amount: invoiceAmountMap.get(formattedDate) ?? 0,
    }
  })
}
