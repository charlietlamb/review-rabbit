'use client'

import AutomationForm from '../automations/automation-form'
import DashboardWrap from '../dashboard/dashboard-wrap'

export default function AutomationCreate() {
  return (
    <DashboardWrap title="Create Automation" subtitle="Create a new automation">
      <div className="p-4">
        <AutomationForm />
      </div>
    </DashboardWrap>
  )
}
