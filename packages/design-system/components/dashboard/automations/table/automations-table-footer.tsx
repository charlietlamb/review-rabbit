import { useAtom } from 'jotai'
import { ListChecks } from 'lucide-react'
import TableFooter from '@rabbit/design-system/components/dashboard/table/table-footer'
import { Button } from '@rabbit/design-system/components/ui/button'
import DangerDialog from '@rabbit/design-system/components/misc/danger-dialog'
import { deleteBulkAutomations } from '@rabbit/design-system/actions/automations/bulk-delete-automations'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { automationsSelectedAtoms } from 'atoms/dashboard/automations/automation-atoms'

export default function AutomationsTableFooter() {
  const [selectedAutomations, setSelectedAutomations] = useAtom(
    automationsSelectedAtoms
  )
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  return (
    <TableFooter show={!!selectedAutomations.length}>
      <div className="flex items-center gap-2">
        <ListChecks />
        <span className="font-heading font-bold">Bulk Actions</span>
        <span className="text-muted-foreground">
          {selectedAutomations.length} automation
          {selectedAutomations.length > 1 ? 's' : ''} selected
        </span>
      </div>
      <div className="flex items-center gap-2">
        <DangerDialog
          title="Delete Automations"
          description="Are you sure you want to delete these automations?"
          loading={loading}
          onClick={async () => {
            setLoading(true)
            await deleteBulkAutomations(
              selectedAutomations.map((automation) => automation.id)
            )
            await queryClient.invalidateQueries({
              queryKey: QUERY_KEYS.AUTOMATIONS,
            })
            setSelectedAutomations([])
            setLoading(false)
          }}
        >
          <Button variant="destructive">
            Delete {selectedAutomations.length} automation
            {selectedAutomations.length > 1 ? 's' : ''}
          </Button>
        </DangerDialog>
      </div>
    </TableFooter>
  )
}
