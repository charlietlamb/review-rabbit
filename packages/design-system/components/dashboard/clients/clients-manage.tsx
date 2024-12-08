'use client'

import { Client } from '@remio/database/schema/clients'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { clientsAtoms } from '@remio/design-system/atoms/dashboard/clients/clients-atoms'
import ClientsTable from './clients-table'
import DashboardContentHeader from '../header/dashboard-content-header'
import ClientsTableSearch from './clients-table-search'
import ClientsNewDialog from './clients-new-dialog'
import { Button } from '@remio/design-system/components/ui/button'

export default function ClientsManage({
  initialClients,
}: {
  initialClients: Client[]
}) {
  const setClients = useSetAtom(clientsAtoms)
  useEffect(() => {
    setClients(initialClients)
  }, [])
  return (
    <div className="flex flex-col divide-y flex-grow overflow-hidden h-full">
      <DashboardContentHeader
        title="Manage Clients"
        subtitle="View and manage your clients"
      />
      <div className="flex items-center justify-between p-4 gap-4">
        <ClientsTableSearch />
        <ClientsNewDialog>
          <Button variant="shine">Add New Client</Button>
        </ClientsNewDialog>
      </div>
      <div className="p-4 overflow-y-auto flex-grow">
        <ClientsTable />
      </div>
    </div>
  )
}
