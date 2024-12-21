'use client'

import OverviewHeader from './overview-header'
import OverviewCards from './overview-cards'
import OverviewChart from './overview-chart'
import { DashboardData } from './overview-types'
import { useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  dashboardDataAtom,
  overviewCompareDataAtom,
  recentPaymentsAtom,
} from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import OverviewRecentPaymentsCard from './recent-payments/overview-recent-payments-card'
import { InvoiceWithClient } from '@remio/database'
import { fetchDashboardData } from '@remio/design-system/actions/dashboard/fetch-dashboard-data'
import {
  overviewCompareDateRange,
  overviewDateRange,
} from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import OverviewBento from './overview-bento'

export default function Overview({
  data,
  compareData,
  recentPayments,
}: {
  data: DashboardData
  compareData: DashboardData
  recentPayments: InvoiceWithClient[]
}) {
  const setDashboardData = useSetAtom(dashboardDataAtom)
  const setCompareDashboardData = useSetAtom(overviewCompareDataAtom)
  const setRecentPayments = useSetAtom(recentPaymentsAtom)
  const dateRange = useAtomValue(overviewDateRange)
  const compareDateRange = useAtomValue(overviewCompareDateRange)

  useEffect(() => {
    setDashboardData(data)
  }, [data])

  useEffect(() => {
    setCompareDashboardData(compareData)
  }, [compareData])

  useEffect(() => {
    setRecentPayments(recentPayments)
  }, [recentPayments])

  useEffect(() => {
    const fetchData = async () => {
      if (!dateRange || !compareDateRange) return
      const newDashboardData = await fetchDashboardData(
        dateRange.from ?? new Date(),
        dateRange.to ?? new Date()
      )
      const compareDashboardData = await fetchDashboardData(
        compareDateRange.from ?? new Date(),
        compareDateRange.to ?? new Date()
      )
      setDashboardData(newDashboardData)
      setCompareDashboardData(compareDashboardData)
    }
    fetchData()
  }, [dateRange])

  return (
    <div className="flex flex-col overflow-y-auto">
      <OverviewHeader />
      <OverviewCards />
      <OverviewBento />
      <div className="p-4">
        <OverviewChart />
      </div>
    </div>
  )
}
