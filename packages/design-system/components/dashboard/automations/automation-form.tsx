import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import { useState } from 'react'
import WorkflowSelect from '@rabbit/design-system/components/form/workflow/workflow-select'
import { Button } from '@rabbit/design-system/components/ui/button'
import { toast } from 'sonner'
import WorkflowTimeSelect from '@rabbit/design-system/components/form/workflow/workflow-time-select'
import ClientMultiSelect from '@rabbit/design-system/components/form/clients/client-multi-select'
import { useAtom, useAtomValue } from 'jotai'
import { selectedClientsAtom } from '@rabbit/design-system/atoms/dashboard/client/client-multi-select-atoms'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'
import DangerDialog from '@rabbit/design-system/components/misc/danger-dialog'
import { createAutomation } from '@rabbit/design-system/actions/automations/create-automation'
import { businessIdAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atom'
import InputWithIconState from '@rabbit/design-system/components/form/input/input-with-icon-state'
import { Type } from 'lucide-react'
import { HttpStatusCodes } from '@rabbit/http'

export default function AutomationForm({
  onSuccess,
}: {
  onSuccess?: () => void
}) {
  const [selectedClients, setSelectedClients] = useAtom(selectedClientsAtom)
  const businessId = useAtomValue(businessIdAtom)
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [title, setTitle] = useState<string>('')
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)

  function validate() {
    if (!title) {
      toast.error('You must enter a title', {
        description: 'You must enter a title to create an automation',
      })
      return false
    }
    if (!selectedClients.length) {
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
    if (!businessId) {
      toast.error('You must select a business', {
        description: 'You can do this in the header.',
      })
      return false
    }
    return true
  }

  async function handleSubmit() {
    setAttemptSubmitted(true)
    if (!validate()) return
    toast.success('Creating automation...', {
      description: 'This may take a few seconds...',
    })
    const { status } = await createAutomation({
      title,
      businessId: businessId!,
      clientIds: selectedClients.map((client) => client.id),
      workflowId: selectedWorkflow!,
    })
    if (status === HttpStatusCodes.OK) {
      toast.success('Automation created!', {
        description:
          'Initial automations will run now. You can edit future automations in the automations page.',
      })
      setSelectedClients([])
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
        <InputWithIconState
          icon={<Type />}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e)}
          name="title"
          label="Title"
          type="text"
          required
        />
        <div className="flex flex-col gap-2">
          <RequiredLabel htmlFor="clients">Clients</RequiredLabel>
          <ClientMultiSelect />
        </div>
        <WorkflowSelect
          selectedWorkflow={selectedWorkflow}
          setSelectedWorkflow={setSelectedWorkflow}
        />
        <WorkflowTimeSelect date={date} setDate={setDate} />
        <DangerDialog
          title="Create Automation"
          description="This will create an automation that will run on the selected clients."
          variant="shine"
          onClick={handleSubmit}
        >
          <Button variant="shine" className="w-full">
            Create Automation
          </Button>
        </DangerDialog>
      </div>
    </FormProvider>
  )
}
