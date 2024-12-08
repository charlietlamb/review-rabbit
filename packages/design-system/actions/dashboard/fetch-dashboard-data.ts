import { getClientsChartData } from '@remio/design-system/actions/clients/get-clients-chart-data'
import { getInvoicesChartData } from '@remio/design-system/actions/invoices/get-invoices-chart-data'
import { fetchRecentPayments } from './fetch-recent-payments'

export async function fetchDashboardData() {
  const [clientData, invoiceData, recentPayments] = await Promise.all([
    getClientsChartData(),
    getInvoicesChartData(),
    fetchRecentPayments(0),
  ])

  return {
    clientData,
    invoiceData,
    recentPayments,
  }
}
