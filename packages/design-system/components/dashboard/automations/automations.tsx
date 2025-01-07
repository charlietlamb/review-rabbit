import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'
import AutomationsTable from './automations-table'

export default function Automations() {
  return (
    <DashboardWrap
      title="Automations"
      subtitle="Manage and schedule your automations"
    >
      <div className="flex-grow">
        <AutomationsTable />
      </div>
    </DashboardWrap>
  )
}
