import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import { Client } from '@remio/database/schema/clients'
import { Checkbox } from '@remio/design-system/components/ui/checkbox'
import { Label } from '@remio/design-system/components/ui/label'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import {
  mediationAllClientsAtom,
  mediationClientsAtom,
} from '@remio/design-system/atoms/dashboard/mediations/mediation-atoms'

export default function MediationFormClientEmail({
  form,
  client,
}: {
  form: TanstackForm<any>
  client?: Client
}) {
  const [checked, setChecked] = useState(false)
  const [mediationClients, setMediationClients] = useAtom(mediationClientsAtom)
  const [mediationAllClients, setMediationAllClients] = useAtom(
    mediationAllClientsAtom
  )

  useEffect(() => {
    if (client) {
      const clientState = mediationClients.find(
        (c) => c.client.id === client.id
      )
      setChecked(clientState?.data.email ?? false)
    } else {
      setChecked(mediationAllClients.email)
    }
  }, [client, mediationClients, mediationAllClients])

  function handleChange() {
    const newState = !checked
    if (client) {
      setMediationClients((prev) =>
        prev.find((c) => c.client.id === client.id)
          ? prev.map((c) =>
              c.client.id === client.id
                ? { ...c, data: { ...c.data, email: newState } }
                : c
            )
          : [...prev, { client, data: { email: newState, invoice: null } }]
      )
    } else {
      setMediationAllClients((prev) => ({
        ...prev,
        email: newState,
      }))
    }
    setChecked(newState)
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={client ? `client-email-${client.id}` : 'client-email-all'}
        checked={checked}
        onCheckedChange={handleChange}
        className="rounded-md cursor-pointer"
      />
      <Label
        htmlFor={client ? `client-email-${client.id}` : 'client-email-all'}
        className="font-heading cursor-pointer"
      >
        Send confirmation email
      </Label>
    </div>
  )
}
