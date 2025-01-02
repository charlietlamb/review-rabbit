import { Automation } from '@rabbit/database/schema/app/automations'
import { Client } from '@rabbit/database/schema/app/clients'
import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import { useState } from 'react'
import ClientSelectState from '@rabbit/design-system/components/form/clients/client-select-state'

export default function AutomationForm({
  automation,
  client,
  onSuccess,
}: {
  automation?: Automation
  client?: Client
  onSuccess?: () => void
}) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(
    client || null
  )
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)

  return (
    <FormProvider value={{ attemptSubmitted }}>
      <div className="flex flex-col gap-4">
        <ClientSelectState
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
      </div>
    </FormProvider>
  )
}
