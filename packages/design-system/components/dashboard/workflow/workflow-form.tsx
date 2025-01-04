'use client'

import { Button } from '@rabbit/design-system/components/ui/button'
import Flow from '@rabbit/design-system/components/flow/flow'
import { toast } from 'sonner'
import { useAtomValue } from 'jotai'
import { nodesAtom } from '@rabbit/design-system/atoms/flow/flow-atoms'
import getWorkflowData from '@rabbit/design-system/components/flow/lib/get-workflow-data'
import { createWorkflow } from '@rabbit/design-system/actions/workflows/create-workflow'
import { HttpStatusCodes } from '@rabbit/http'
import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
import { updateWorkflow } from '@rabbit/design-system/actions/workflows/update-workflow'
import { useRouter } from 'next/navigation'

export default function WorkflowForm({
  title,
  workflow,
}: {
  title: string
  workflow?: WorkflowWithItems
}) {
  const nodes = useAtomValue(nodesAtom)
  const router = useRouter()
  function validate() {
    if (!title) {
      toast.error('Title is required', {
        description: 'You can add this in the top right corner.',
      })
      return false
    }
    if (nodes.length < 2) {
      toast.error('Workflow must have at least 2 nodes', {
        description:
          'You can add a node by clicking the "Add Automation" button.',
      })
      return false
    }
    return true
  }

  async function handleSubmit() {
    if (!validate()) return
    if (!workflow) {
      toast.success('Creating workflow...', {
        description: 'This may take a few seconds...',
      })
      const { status, id } = await createWorkflow({
        title,
        items: getWorkflowData(nodes.slice(1)).items,
      })
      if (status === HttpStatusCodes.OK) {
        toast.success('Workflow created!', {
          description: 'You can now use this workflow in your automations.',
        })
        router.push(`/dashboard/workflow/${id}`)
      } else {
        toast.error('Failed to create workflow', {
          description: 'Please try again.',
        })
      }
    } else {
      toast.success('Updating workflow...', {
        description: 'This may take a few seconds...',
      })
      const status = await updateWorkflow(
        {
          title,
          items: getWorkflowData(nodes.slice(1)).items,
        },
        workflow.id
      )
      if (status === HttpStatusCodes.OK) {
        toast.success('Workflow updated!', {
          description: 'You can now use this workflow in your automations.',
        })
      } else {
        toast.error('Failed to update workflow', {
          description: 'Please try again.',
        })
      }
    }
  }

  return (
    <div className="flex flex-col divide-y flex-grow">
      <Flow workflow={workflow} />
      <div className="p-4">
        <Button className="w-full" variant="shine" onClick={handleSubmit}>
          {workflow ? 'Update Workflow' : 'Create Workflow'}
        </Button>
      </div>
    </div>
  )
}
