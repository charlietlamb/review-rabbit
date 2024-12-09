'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import InvoiceCreateCard from './invoice-create-card'
import InvoicesManageCard from './invoices-manage-card'
import InvoicesChart from './invoices-chart'
import { InvoicesChart as InvoicesChartType } from './invoice-types'

export default function Invoices({
  chartData,
}: {
  chartData: InvoicesChartType
}) {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Payments"
        subtitle="View your payments, invoices and more."
      />
      <div className="p-4 gap-4 grid grid-cols-2">
        <InvoicesChart chartData={chartData} className="col-span-2" />
        <InvoicesManageCard />
        <InvoiceCreateCard />
      </div>
    </div>
  )
}
