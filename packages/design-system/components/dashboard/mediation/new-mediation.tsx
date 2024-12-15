'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import MediationForm from './mediation-form'

export default function NewMediation() {
  return (
    <div className="flex flex-col overflow-y-auto divide-y">
      <DashboardContentHeader
        title="New Mediation"
        subtitle="Schedule a new mediation"
      />
      <div className="overflow-y-auto">
        <MediationForm />
      </div>
    </div>
  )
}
