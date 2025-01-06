import DashboardContentHeader from '../header/dashboard-content-header'
import AutomationsTable from './automations-table'

export default function Automations() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Automations"
        subtitle="Manage and schedule your automations"
      />
      <div className="p-4 flex-grow">
        <AutomationsTable />
      </div>
    </div>
  )
}
