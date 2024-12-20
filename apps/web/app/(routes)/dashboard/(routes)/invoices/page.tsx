import Invoices from '@remio/design-system/components/dashboard/invoices/invoices'
import { getInvoicesChartData } from '@remio/design-system/actions/invoices/get-invoices-chart-data'
import { addDays } from 'date-fns'

export default async function page() {
  const chartData = await getInvoicesChartData(
    new Date(addDays(new Date(), -30)),
    new Date()
  )
  return <Invoices chartData={chartData} />
}
