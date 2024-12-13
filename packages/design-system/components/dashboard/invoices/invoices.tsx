'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import InvoiceCreateCard from './invoice-create-card'
import InvoicesManageCard from './invoices-manage-card'
import InvoicesChart from './invoices-chart'
import { InvoicesChart as InvoicesChartType } from './invoice-types'
import { useEffect } from 'react'
import { useSetAtom, useAtomValue } from 'jotai'
import {
  invoicesChartData,
  invoicesDateRange,
} from '@remio/design-system/atoms/dashboard/invoices/invoices-atoms'
import { getInvoicesChartData } from '@remio/design-system/actions/invoices/get-invoices-chart-data'

export default function Invoices({
  chartData,
}: {
  chartData: InvoicesChartType
}) {
  const dateRange = useAtomValue(invoicesDateRange)
  const setInvoicesChartData = useSetAtom(invoicesChartData)

  useEffect(() => {
    setInvoicesChartData(chartData)
  }, [chartData])

  useEffect(() => {
    async function fetchClients() {
      if (!dateRange) return

      const invoiceChartData = await getInvoicesChartData(
        dateRange?.from ?? new Date(),
        dateRange?.to ?? new Date()
      )
      setInvoicesChartData(invoiceChartData)
    }
    fetchClients()
  }, [dateRange])

  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Payments"
        subtitle="View your payments, invoices and more."
      />
      <div className="p-4 gap-4 grid grid-cols-2">
        <InvoicesChart className="col-span-2" />
        <InvoicesManageCard />
        <InvoiceCreateCard />
      </div>
    </div>
  )
}
