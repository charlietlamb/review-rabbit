'use client'

import { Button } from '@rabbit/design-system/components/ui/button'
import WorkflowsTable from './workflows-table'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'
import { useRouter } from 'next/navigation'

export default function Workflows() {
  const router = useRouter()
  return (
    <DashboardWrap
      title="Workflows"
      subtitle="Manage your workflows"
      right={
        <Button
          className="ml-auto"
          variant="shine"
          onClick={() => router.push('/dashboard/workflow/create')}
        >
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
