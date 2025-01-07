'use client'

import WorkflowForm from './workflow-form'
import { ReactFlowProvider } from '@xyflow/react'
import { useState } from 'react'
import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import InputWithIconState from '@rabbit/design-system/components/form/input/input-with-icon-state'
import { Type } from 'lucide-react'
import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'

export default function WorkflowManage({
  workflow,
}: {
  workflow?: WorkflowWithItems
}) {
  const [title, setTitle] = useState(workflow?.title || '')
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  return (
    <FormProvider value={{ attemptSubmitted }}>
      <DashboardWrap
        title={workflow ? title : 'Create Workflow'}
        subtitle={workflow ? 'Update your workflow' : 'Create a new workflow'}
        right={
          <InputWithIconState
            value={title}
            className="ml-auto"
            onChange={(value) => setTitle(value)}
            name="title"
            label="Title"
            placeholder="Enter a title"
            icon={<Type />}
            type="text"
            required
            hideLabel
          />
        }
      >
        <ReactFlowProvider>
          <WorkflowForm title={title} workflow={workflow} />
        </ReactFlowProvider>
      </DashboardWrap>
    </FormProvider>
  )
}
