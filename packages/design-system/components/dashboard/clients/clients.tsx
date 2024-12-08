'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import ClientCardCreate from './client-card-create'
import ClientsChart from './clients-chart'
import ClientsManageCard from './clients-manage-card'
import { ClientsChart as ClientsChartType } from './client-types'

export default function Clients({
  chartData,
}: {
  chartData: ClientsChartType
}) {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Clients"
        subtitle="View your client activity - add, edit or remove clients."
      />
      <div className="p-4 gap-4 grid grid-cols-2">
        <ClientsChart chartData={chartData} className="col-span-2" />
        <ClientsManageCard />
        <ClientCardCreate />
      </div>
    </div>
  )
}
