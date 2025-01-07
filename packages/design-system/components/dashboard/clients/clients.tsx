'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import { clientsSearchAtom } from '@rabbit/design-system/atoms/dashboard/clients/clients-atoms'
import ClientsTable from './clients-table'
import ClientsNewDialog from './clients-new-dialog'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useAtom } from 'jotai'
import TableSearch from '@rabbit/design-system/components/dashboard/table/table-search'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'

export default function Clients() {
  const [search, setSearch] = useAtom(clientsSearchAtom)
  return (
    <DashboardWrap
      title="Clients"
      subtitle="View your client activity - add, edit or remove clients."
    >
      <div className="flex items-center justify-between p-4 gap-4">
        <TableSearch search={search} setSearch={setSearch} />
        <ClientsNewDialog>
          <Button variant="shine">Add New Client</Button>
        </ClientsNewDialog>
      </div>
      <div className="overflow-y-auto flex-grow">
        <ClientsTable />
      </div>
    </DashboardWrap>
  )
}
