import Clients from '@remio/design-system/components/dashboard/clients/clients'
import { getClientsChartData } from '@remio/design-system/actions/clients/get-clients-chart-data'

export default async function page() {
  const chartData = await getClientsChartData()
  return <Clients chartData={chartData} />
}
