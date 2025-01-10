import { useAtomValue } from 'jotai'
import { ListChecks } from 'lucide-react'
import { clientsSelectedAtoms } from '@rabbit/design-system/atoms/dashboard/clients/clients-atoms'
import TableFooter from '@rabbit/design-system/components/dashboard/table/table-footer'
import { Button } from '@rabbit/design-system/components/ui/button'

export default function ClientsTableFooter() {
  const selectedClients = useAtomValue(clientsSelectedAtoms)
  return (
    <TableFooter show={!!selectedClients.length}>
      <div className="flex items-center gap-2">
        <ListChecks />
        <span className="font-heading font-bold">Bulk Actions</span>
        <span className="text-muted-foreground">
          {selectedClients.length} clients selected
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="shine">New Automation</Button>
        <Button variant="outline">Delete</Button>
      </div>
    </TableFooter>
  )
}
