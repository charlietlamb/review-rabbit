import OverviewSchedule from './schedule/overview-schedule'
import { OverviewAverageInvoices } from './average/overview-average-invoices'
import { OverviewClients } from './average/overview-clients'
import OverviewRecentPaymentsCard from './recent-payments/overview-recent-payments-card'
import { useRef } from 'react'

export default function OverviewBento() {
  const sizeRef = useRef(null)
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 p-4 pb-0">
      <OverviewSchedule sizeRef={sizeRef} />
      <div className="flex flex-col gap-4" ref={sizeRef}>
        <OverviewAverageInvoices />
        <OverviewClients />
      </div>
      <OverviewRecentPaymentsCard />
    </div>
  )
}
