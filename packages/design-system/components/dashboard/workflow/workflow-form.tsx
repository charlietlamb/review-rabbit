'use client'

import { Button } from '@rabbit/design-system/components/ui/button'
import Flow from '@rabbit/design-system/components/flow/flow'
import { toast } from 'sonner'
import { useAtomValue } from 'jotai'
import { nodesAtom } from '@rabbit/design-system/atoms/flow/flow-atoms'

export default function WorkflowForm({ title }: { title: string }) {
  const nodes = useAtomValue(nodesAtom)
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
    toast.success('Creating workflow...', {
      description: 'This may take a few seconds...',
    })
  }

  return (
    <div className="flex flex-col divide-y flex-grow">
      <Flow />
      <div className="p-4">
        <Button className="w-full" variant="shine" onClick={handleSubmit}>
          Create Workflow
        </Button>
      </div>
    </div>
  )
}
