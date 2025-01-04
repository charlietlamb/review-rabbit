'use client'

import InputWithIconState from '@rabbit/design-system/components/form/input/input-with-icon-state'
import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import { Type } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@rabbit/design-system/components/ui/button'
import Flow from '@rabbit/design-system/components/flow/flow'

export default function WorkflowForm() {
  const [title, setTitle] = useState('')
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  return (
    <FormProvider value={{ attemptSubmitted }}>
      <div className="flex flex-col divide-y flex-grow">
        <div className="p-4">
          <InputWithIconState
            value={title}
            onChange={(value) => setTitle(value)}
            name="title"
            label="Title"
            placeholder="Enter a title"
            icon={<Type />}
            type="text"
            required
            hideLabel
          />
        </div>
        <Flow />
        <div className="p-4">
          <Button className="w-full" variant="shine">
            Create Workflow
          </Button>
        </div>
      </div>
    </FormProvider>
  )
}
