import DashboardContentHeader from '../header/dashboard-content-header'
import { Button } from '@rabbit/design-system/components/ui/button'
import WorkflowsTable from './workflows-table'

export default function Workflows() {
  return (
    <div className="flex flex-col divide-y flex-grow">
      <DashboardContentHeader
        title="Workflows"
        subtitle="Manage your workflows"
        right={
          <Button className="ml-auto" variant="shine">
            Create Workflow
          </Button>
        }
      />
      <div className="p-4">
        <WorkflowsTable />
      </div>
    </div>
  )
}
