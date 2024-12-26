'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import OverviewSchedule from '../overview/schedule/overview-schedule'
import MediationsManageCard from './mediations-manage-card'
import NewMediationCard from './new-mediation-card'
export default function Mediations() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Mediations"
        subtitle="View your mediation activity - add, edit or remove mediations."
      />
      <div className="flex flex-col p-4 gap-4 overflow-y-auto">
        <OverviewSchedule dateOffset={5} mediationsClassName="h-96" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MediationsManageCard />
          <NewMediationCard />
        </div>
      </div>
    </div>
  )
}
