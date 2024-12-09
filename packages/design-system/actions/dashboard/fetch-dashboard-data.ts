import { getClientsChartData } from '@remio/design-system/actions/clients/get-clients-chart-data'
import { getInvoicesChartData } from '@remio/design-system/actions/invoices/get-invoices-chart-data'
import { fetchRecentInvoices } from './fetch-recent-invoices'

export async function fetchDashboardData() {
  const [clientData, invoiceData, recentInvoices] = await Promise.all([
    getClientsChartData(),
    getInvoicesChartData(),
    fetchRecentInvoices(0),
  ])

  return {
    clientData,
    invoiceData,
    recentInvoices,
  }
}
