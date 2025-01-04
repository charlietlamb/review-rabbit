import { AutomationForm as AutomationFormType } from '@rabbit/database/schema/app/automations'
import { Client } from '@rabbit/database/schema/app/clients'
import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import { useState } from 'react'
import ClientSelectState from '@rabbit/design-system/components/form/clients/client-select-state'
import WorkflowSelect from '@rabbit/design-system/components/form/workflow/workflow-select'
import { Button } from '@rabbit/design-system/components/ui/button'
import { toast } from 'sonner'

export default function AutomationForm({
  automation,
  client,
  onSuccess,
}: {
  automation?: AutomationFormType
  client?: Client
  onSuccess?: () => void
}) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(
    client || null
  )
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(
    automation?.workflowId || null
  )
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)

  function validate() {
    if (!selectedClient) {
      toast.error('You must select a client', {
        description: 'You must select a client to create an automation',
      })
      return false
    }
    if (!selectedWorkflow) {
      toast.error('You must select a workflow', {
        description: 'You must select a workflow to create an automation',
      })
      return false
    }
    return true
  }

  async function handleSubmit() {
    if (!validate()) return
    toast.success('Creating automation...', {
      description: 'This may take a few seconds...',
    })
    const status = await createAutomation({
      clientId: selectedClient!.id,
      workflowId: selectedWorkflow!,
    })
    if (status === 'success') {
      toast.success('Automation created!', {
        description:
          'Initial automations will run now. You can edit future automations in the automations page.',
      })
      onSuccess?.()
    } else {
      toast.error('Failed to create automation', {
        description: 'Please try again later.',
      })
    }
  }

  return (
    <FormProvider value={{ attemptSubmitted }}>
      <div className="flex flex-col gap-4">
        <ClientSelectState
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
        <WorkflowSelect
          selectedWorkflow={selectedWorkflow}
          setSelectedWorkflow={setSelectedWorkflow}
        />
        <Button variant="shine" className="w-full" onClick={handleSubmit}>
          Create Automation
        </Button>
      </div>
    </FormProvider>
  )
}
