'use client'

import { ClientWithData } from '@rabbit/database/schema/app/clients'
import ClientAvatar from '../clients/avatar/client-avatar'
import { Button } from '@rabbit/design-system/components/ui/button'
import ClientsForm from '../clients/form/clients-form'
import { useRouter } from 'next/navigation'
import AutomationFormDialog from '../automations/automation-form-dialog'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'

export default function Client({ client }: { client: ClientWithData }) {
  const router = useRouter()

  return (
    <DashboardWrap
      title={client.name}
      subtitle={`Manage and view information about ${client.name}`}
      left={<ClientAvatar client={client} className="mr-4" />}
      right={
        <AutomationFormDialog>
          <Button className="ml-auto" variant="shine">
            Create Automation
          </Button>
        </AutomationFormDialog>
      }
    >
      <ClientsForm
        client={client}
        className="w-full p-4"
        onDelete={() => router.push('/dashboard/clients')}
      />
    </DashboardWrap>
  )
}
