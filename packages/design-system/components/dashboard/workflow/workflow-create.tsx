'use client'

import DashboardContentHeader from '@rabbit/design-system/components/dashboard/header/dashboard-content-header'
import WorkflowForm from './workflow-form'
import { ReactFlowProvider } from '@xyflow/react'
import { useState } from 'react'
import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import InputWithIconState from '@rabbit/design-system/components/form/input/input-with-icon-state'
import { Type } from 'lucide-react'

export default function WorkflowCreate() {
  const [title, setTitle] = useState('')
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  return (
    <FormProvider value={{ attemptSubmitted }}>
      <div className="flex flex-col divide-y flex-grow">
        <DashboardContentHeader
          title="Create Workflow"
          subtitle="Create a new workflow"
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
        />
        <ReactFlowProvider>
          <WorkflowForm title={title} />
        </ReactFlowProvider>
      </div>
    </FormProvider>
  )
}
