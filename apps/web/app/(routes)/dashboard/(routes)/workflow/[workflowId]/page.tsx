import WorkflowManage from '@rabbit/design-system/components/dashboard/workflow/workflow-manage'
import { getWorkflowById } from '@rabbit/design-system/actions/workflows/get-workflow-by-id'
import { redirect } from 'next/navigation'

export default async function WorkflowPage({
  params,
}: {
  params: { workflowId: string }
}) {
  const { workflowId } = await params
  const workflow = await getWorkflowById(workflowId)
  if (!workflow) {
    return redirect('/dashboard/workflows')
  }
  return <WorkflowManage workflow={workflow} />
}
