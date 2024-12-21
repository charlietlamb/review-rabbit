import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@remio/design-system/components/ui/dropdown-menu'
import { Button } from '@remio/design-system/components/ui/button'
import { Download, MoreHorizontal, Pencil } from 'lucide-react'
import InvoiceEditDialog from './invoice-edit-dialog'
import { InvoiceWithClient } from '@remio/database'
import getInvoice from '@remio/design-system/lib/pdf/get-invoice'
import useUser from '@remio/design-system/hooks/use-user'

export default function InvoicesTableDropdown({
  invoice,
}: {
  invoice: InvoiceWithClient
}) {
  const user = useUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          colors="ghost"
          size="iconSm"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
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
        <DropdownMenuSeparator className="bg-border m-0" />
        <div
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-border transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            if (user) getInvoice(invoice, user)
          }}
        >
          <Download className="mr-2 h-4 w-4" />
          <span className="text-base">Download</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
