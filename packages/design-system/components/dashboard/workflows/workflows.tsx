import { Button } from '@rabbit/design-system/components/ui/button'
import WorkflowsTable from './workflows-table'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'

export default function Workflows() {
  return (
    <DashboardWrap
      title="Workflows"
      subtitle="Manage your workflows"
      right={
        <Button className="ml-auto" variant="shine">
          Create Workflow
        </Button>
      }
    >
      <div className="flex-grow">
        <WorkflowsTable />
      </div>
    </DashboardWrap>
  )
}
