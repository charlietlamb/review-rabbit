'use server'

import client from '@remio/design-system/lib/client'
import { InvoicesChart } from '@remio/design-system/components/dashboard/payments/invoice-types'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'

export async function getInvoicesChartData(): Promise<InvoicesChart> {
  const response = await client.invoices.chart.$get(
    {},
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch invoices chart data')
  }
  const invoicesResults = await response.json()

  return invoicesResults
}
