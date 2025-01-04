import DashboardContentHeader from '@rabbit/design-system/components/dashboard/header/dashboard-content-header'
import WorkflowForm from './workflow-form'
import { ReactFlowProvider } from '@xyflow/react'

export default function WorkflowCreate() {
  return (
    <div className="flex flex-col divide-y flex-grow">
      <DashboardContentHeader
        title="Create Workflow"
        subtitle="Create a new workflow"
      />
      <ReactFlowProvider>
        <WorkflowForm />
      </ReactFlowProvider>
    </div>
  )
}
