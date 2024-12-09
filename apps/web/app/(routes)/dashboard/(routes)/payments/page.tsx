import Invoices from '@remio/design-system/components/dashboard/invoices/invoices'
import { getInvoicesChartData } from '@remio/design-system/actions/invoices/get-invoices-chart-data'

export default async function page() {
  const chartData = await getInvoicesChartData()
  return <Invoices chartData={chartData} />
}
