import { ChartSpline, FileText, UsersRound, Wallet } from 'lucide-react'
import OverviewCard from './overview-card'
import { useAtomValue } from 'jotai'
import {
  dashboardDataAtom,
  overviewCompareDataAtom,
} from '@remio/design-system/atoms/dashboard/overview/overview-atoms'

export default function OverviewCards() {
  const dashboardData = useAtomValue(dashboardDataAtom)
  const compareDashboardData = useAtomValue(overviewCompareDataAtom)

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

  const invoicesIssued = dashboardData.invoiceData.length
  const invoicesIssuedCompare = compareDashboardData.invoiceData.length
  const invoicesIssuedChange = invoicesIssued - invoicesIssuedCompare

  const validInvoices = dashboardData.invoiceData.filter(
    (invoice) => Number(invoice.amount) > 0
  )
  const validCompareInvoices = compareDashboardData.invoiceData.filter(
    (invoice) => Number(invoice.amount) > 0
  )

  const averageInvoiceValue =
    validInvoices.length > 0
      ? validInvoices.reduce(
          (acc, invoice) => acc + Number(invoice.amount),
          0
        ) / validInvoices.length
      : 0

  const averageInvoiceValueCompare =
    validCompareInvoices.length > 0
      ? validCompareInvoices.reduce(
          (acc, invoice) => acc + Number(invoice.amount),
          0
        ) / validCompareInvoices.length
      : 0

  const averageInvoiceValueChange =
    averageInvoiceValue - averageInvoiceValueCompare

  const formattedRevenue = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(totalRevenue)

  const formattedRevenueChange = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(revenueChange)

  const formattedAverageInvoiceValue = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(averageInvoiceValue)

  const formattedAverageInvoiceValueChange = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(averageInvoiceValueChange)

  return (
    <div className="md:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-4 p-4 pb-0">
      <OverviewCard
        title="Total Revenue"
        value={formattedRevenue}
        change={formattedRevenueChange}
        changeValue={revenueChange}
        icon={<Wallet />}
      />
      <OverviewCard
        title="New Clients"
        value={newClients.toString()}
        change={newClientsChange.toString()}
        changeValue={newClientsChange}
        icon={<UsersRound />}
      />
      <OverviewCard
        title="Invoices issued"
        value={invoicesIssued.toString()}
        change={invoicesIssuedChange.toString()}
        changeValue={invoicesIssuedChange}
        icon={<FileText />}
      />
      <OverviewCard
        title="Average Invoice Value"
        value={formattedAverageInvoiceValue}
        change={formattedAverageInvoiceValueChange}
        changeValue={averageInvoiceValueChange}
        icon={<ChartSpline />}
      />
    </div>
  )
}
