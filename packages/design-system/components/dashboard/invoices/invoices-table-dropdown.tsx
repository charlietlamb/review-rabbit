import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@remio/design-system/components/ui/dropdown-menu'
import { Button } from '@remio/design-system/components/ui/button'
import { MoreHorizontal, Pencil } from 'lucide-react'
import InvoiceEditDialog from './invoice-edit-dialog'
import { InvoiceWithClient } from '@remio/database'

export default function InvoicesTableDropdown({
  invoice,
}: {
  invoice: InvoiceWithClient
}) {
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
          <InvoiceEditDialog invoice={invoice} client={invoice.client}>
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-border transition-colors">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </div>
          </InvoiceEditDialog>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator className="bg-border m-0" />
        <DropdownMenuItem asChild>
          <InvoiceRemindDialog invoice={invoice}>
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-border transition-colors">
              <FileText className="mr-2 h-4 w-4" />
              New Invoice
            </div>
          </InvoiceRemindDialog>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
