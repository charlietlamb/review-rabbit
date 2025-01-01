import ClientsEditDialog from './clients-edit-dialog'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@rabbit/design-system/components/ui/dropdown-menu'
import { Button } from '@rabbit/design-system/components/ui/button'
import { MoreHorizontal, Pencil, FileText } from 'lucide-react'
import { Client } from '@rabbit/database/schema/app/clients'
import { useState } from 'react'
import AutomationFormDialog from '../automations/automation-form-dialog'

export default function ClientsTableDropdown({ client }: { client: Client }) {
  const [open, setOpen] = useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          colors="ghost"
          size="iconSm"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpen(true)
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px] p-0"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <DropdownMenuItem className="cursor-pointer" asChild>
          <ClientsEditDialog client={client}>
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-border transition-colors">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </div>
          </ClientsEditDialog>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border m-0" />
        <DropdownMenuItem asChild>
          <AutomationFormDialog client={client}>
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-border transition-colors">
              <FileText className="mr-2 h-4 w-4" />
              New Automation
            </div>
          </AutomationFormDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
