import ClientsEditDialog from './clients-edit-dialog'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@remio/design-system/components/ui/dropdown-menu'
import { Button } from '@remio/design-system/components/ui/button'
import { MoreHorizontal, Pencil, FileText, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Client } from '@remio/database/schema/clients'
import InvoiceCreateDialog from './invoice-create-dialog'

export default function ClientsTableDropdown({ client }: { client: Client }) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" colors="ghost" size="iconSm">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] p-0">
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
          <InvoiceCreateDialog client={client}>
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-border transition-colors">
              <FileText className="mr-2 h-4 w-4" />
              New Invoice
            </div>
          </InvoiceCreateDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
