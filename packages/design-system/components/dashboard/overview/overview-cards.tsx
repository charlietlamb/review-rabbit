import { CircleDollarSign } from 'lucide-react'
import OverviewCard from './overview-card'
import { useAtomValue } from 'jotai'
import {
  dashboardDataAtom,
  overviewCompareDataAtom,
} from '@remio/design-system/atoms/dashboard/overview/overview-atoms'

export default function OverviewCards() {
  const dashboardData = useAtomValue(dashboardDataAtom)
  const compareDashboardData = useAtomValue(overviewCompareDataAtom)
  console.log(dashboardData)

  const totalRevenue = dashboardData.invoiceData.reduce(
    (acc, invoice) => acc + Number(invoice.amount),
    0
  )
  const totalRevenueCompare = compareDashboardData.invoiceData.reduce(
    (acc, invoice) => acc + Number(invoice.amount),
    0
  )
  const revenueChange = totalRevenue - totalRevenueCompare
  const newClients = dashboardData.clientData.length
  const newClientsCompare = compareDashboardData.clientData.length
  const newClientsChange = newClients - newClientsCompare

  const formattedRevenue = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(totalRevenue)

  return (
    <div className="md:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-4 p-4">
      <OverviewCard
        title="Total Revenue"
        value={formattedRevenue}
        change={revenueChange}
        icon={<CircleDollarSign />}
      />
      <OverviewCard
        title="New Clients"
        value={newClients.toString()}
        change={newClientsChange}
        icon={<CircleDollarSign />}
      />
      <OverviewCard
        title="Total Revenue"
        value="$45,231.89"
        change={newClientsChange}
        icon={<CircleDollarSign />}
      />
      <OverviewCard
        title="Total Revenue"
        value="$45,231.89"
        change={newClientsChange}
        icon={<CircleDollarSign />}
      />
    </div>
  )
}
