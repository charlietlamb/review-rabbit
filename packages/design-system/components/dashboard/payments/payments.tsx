'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import PaymentsChart from './payments-chart'
import { InvoicesChart } from './invoice-types'

export default function Payments({ chartData }: { chartData: InvoicesChart }) {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Payments"
        subtitle="View your payments, invoices and more."
      />
      <div className="p-4 gap-4 grid grid-cols-2">
        <PaymentsChart chartData={chartData} className="col-span-2" />
        {/* <ClientsManageCard />
        <ClientCardCreate /> */}
      </div>
    </div>
  )
}
