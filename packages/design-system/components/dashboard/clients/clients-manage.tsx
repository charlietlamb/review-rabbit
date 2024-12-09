'use client'

import { Client } from '@remio/database/schema/clients'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { clientsAtoms } from '@remio/design-system/atoms/dashboard/clients/clients-atoms'
import ClientsTable from './clients-table'
import DashboardContentHeader from '../header/dashboard-content-header'
import ClientsNewDialog from './clients-new-dialog'
import { Button } from '@remio/design-system/components/ui/button'
import { useAtom } from 'jotai'
import { clientsSearchAtoms } from '@remio/design-system/atoms/dashboard/clients/clients-atoms'
import TableSearch from '../table/table-search'
export default function ClientsManage({
  initialClients,
}: {
  initialClients: Client[]
}) {
  const setClients = useSetAtom(clientsAtoms)
  const [search, setSearch] = useAtom(clientsSearchAtoms)
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
        <TableSearch search={search} setSearch={setSearch} />
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
