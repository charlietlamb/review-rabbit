'use client'

import OverviewHeader from './overview-header'
import OverviewCards from './overview-cards'
import OverviewChart from './overview-chart'
import { DashboardData } from './overview-types'
import { getDashboardCombinedData } from '@remio/design-system/lib/dashboard/get-dashboard-combined-data'
import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { recentPaymentsAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import OverviewRecentPaymentsCard from './recent-payments/overview-recent-payments-card'

export default function Overview({ data }: { data: DashboardData }) {
  const combinedData = getDashboardCombinedData(data)
  const setRecentPayments = useSetAtom(recentPaymentsAtom)

  useEffect(() => {
    setRecentPayments(data.recentPayments)
  }, [data.recentPayments])

  return (
    <div className="flex flex-col divide-y">
      <OverviewHeader />
      <OverviewCards />
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <OverviewChart chartData={combinedData} />
        <OverviewRecentPaymentsCard />
      </div>
    </div>
  )
}
