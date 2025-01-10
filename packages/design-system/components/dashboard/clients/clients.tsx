'use client'

import { clientsSearchAtom } from '@rabbit/design-system/atoms/dashboard/clients/clients-atoms'
import ClientsTable from './table/clients-table'
import ClientsNewDialog from './dialog/clients-new-dialog'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useAtom } from 'jotai'
import TableSearch from '@rabbit/design-system/components/dashboard/table/table-search'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'
import ClientsBulkDialog from './dialog/clients-bulk-dialog'
import ClientsTableFooter from './table/clients-table-footer'

export default function Clients() {
  const [search, setSearch] = useAtom(clientsSearchAtom)
  return (
    <DashboardWrap
      title="Clients"
      subtitle="View your client activity - add, edit or remove clients."
    >
      <div className="flex items-center justify-between p-4 gap-4">
        <TableSearch search={search} setSearch={setSearch} />
        <ClientsBulkDialog>
          <Button className="font-heading font-bold" variant="outline">
            Bulk Add Clients
          </Button>
        </ClientsBulkDialog>
        <ClientsNewDialog>
          <Button variant="shine">Add New Client</Button>
        </ClientsNewDialog>
      </div>
      <div className="overflow-y-auto flex-grow">
        <ClientsTable />
      </div>
      <ClientsTableFooter />
    </DashboardWrap>
  )
}
