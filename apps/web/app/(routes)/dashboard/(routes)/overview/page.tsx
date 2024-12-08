import Overview from '@remio/design-system/components/dashboard/overview/overview'
import { fetchDashboardData } from '@remio/design-system/actions/dashboard/fetch-dashboard-data'

export default async function OverviewPage() {
  const dashboardData = await fetchDashboardData()
  return <Overview data={dashboardData} />
}
