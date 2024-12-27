import { TanstackForm } from '@burse/design-system/components/form/tanstack-form'
import RequiredLabel from '@burse/design-system/components/misc/required-label'
import ClientMultiSelect from './client-multi-select'
import { useAtomValue } from 'jotai'
import { clientsSelectAtom } from '@burse/design-system/atoms/dashboard/clients/client-select-atoms'
import { useEffect } from 'react'
import { MediationData } from '@burse/design-system/components/dashboard/mediation/mediation-types'
import { cn } from '@burse/design-system/lib/utils'

export default function ClientsSelect({
  form,
  className,
}: {
  form: TanstackForm<any>
  className?: string
}) {
  const clients = useAtomValue(clientsSelectAtom)

  useEffect(() => {
    const currentClients =
      (form.getFieldValue('clients') as MediationData['data']) || []

    const currentClientIds = new Set(currentClients.map((c) => c.clientId))
    const newClientIds = new Set(clients.map((c) => c.id))

    const clientsToAdd = clients
      .filter((c) => !currentClientIds.has(c.id))
      .map((c) => ({
        clientId: c.id,
        invoice: null,
      }))

    const retainedClients = currentClients.filter((c) =>
      newClientIds.has(c.clientId)
    )

    form.setFieldValue('clients', [...retainedClients, ...clientsToAdd])
  }, [clients, form])

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <RequiredLabel>Select Clients</RequiredLabel>
      <ClientMultiSelect />
    </div>
  )
}
