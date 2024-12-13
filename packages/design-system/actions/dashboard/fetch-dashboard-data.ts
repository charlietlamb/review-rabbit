import { getClientsChartData } from '@remio/design-system/actions/clients/get-clients-chart-data'
import { getInvoicesChartData } from '@remio/design-system/actions/invoices/get-invoices-chart-data'
import { DashboardData } from '@remio/design-system/components/dashboard/overview/overview-types'

export async function fetchDashboardData(
  startDate: Date,
  endDate: Date
): Promise<DashboardData> {
  const [clientData, invoiceData] = await Promise.all([
    getClientsChartData(startDate, endDate),
    getInvoicesChartData(startDate, endDate),
  ])

  return {
    clientData,
    invoiceData,
  }
}
