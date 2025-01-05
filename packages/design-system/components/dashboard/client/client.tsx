'use client'

import { Client as ClientType } from '@rabbit/database/schema/app/clients'
import { useSetAtom } from 'jotai'
import { breadcrumbOverrideAtom } from '@rabbit/design-system/atoms/dashboard/breadcrumb/breadcrumb-atom'
import { useEffect } from 'react'
import DashboardContentHeader from '../header/dashboard-content-header'
import { clientAtom } from '@rabbit/design-system/atoms/dashboard/client/client-atom'
import ClientAvatar from '../clients/client-avatar'
import { Button } from '@rabbit/design-system/components/ui/button'
import ClientsForm from '../clients/clients-form'
import { useRouter } from 'next/navigation'
import AutomationFormDialog from '../automations/automation-form-dialog'

export default function Client({ client }: { client: ClientType }) {
  const breadcrumbOverride = useSetAtom(breadcrumbOverrideAtom)
  const setClient = useSetAtom(clientAtom)
  const router = useRouter()

  useEffect(() => {
    breadcrumbOverride(client.name)
  }, [client.name])

  useEffect(() => {
    setClient(client)
  }, [client])

  return (
    <div className="flex flex-col divide-y overflow-hidden">
      <DashboardContentHeader
        title={client.name}
        subtitle={`Manage and view information about ${client.name}`}
        left={<ClientAvatar client={client} className="mr-4" />}
        right={
          <AutomationFormDialog client={client}>
            <Button className="ml-auto" variant="shine">
              Create Automation
            </Button>
          </AutomationFormDialog>
        }
      />
      <ClientsForm
        client={client}
        className="w-full p-4"
        onDelete={() => router.push('/dashboard/clients')}
      />
    </div>
  )
}
