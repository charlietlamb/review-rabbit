import Payments from '@remio/design-system/components/dashboard/payments/payments'
import { getInvoicesChartData } from '@remio/design-system/actions/invoices/get-invoices-chart-data'

export default async function page() {
  const chartData = await getInvoicesChartData()
  return <Payments chartData={chartData} />
}
