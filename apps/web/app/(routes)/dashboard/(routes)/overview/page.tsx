import Overview from '@remio/design-system/components/dashboard/overview/overview'
import { fetchDashboardData } from '@remio/design-system/actions/dashboard/fetch-dashboard-data'
import { addDays } from 'date-fns'
import { fetchRecentInvoices } from '@remio/design-system/actions/dashboard/fetch-recent-invoices'

export default async function OverviewPage() {
  const dashboardData = await fetchDashboardData(
    addDays(new Date(), -30),
    new Date()
  )
  const compareDashboardData = await fetchDashboardData(
    addDays(new Date(), -60),
    addDays(new Date(), -30)
  )
  const recentPayments = await fetchRecentInvoices(0, true)
  return (
    <Overview
      data={dashboardData}
      compareData={compareDashboardData}
      recentPayments={recentPayments}
    />
  )
}
