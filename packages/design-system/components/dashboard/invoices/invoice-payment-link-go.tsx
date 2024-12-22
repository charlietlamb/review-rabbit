import { InvoiceWithClient } from '@remio/database'
import getInvoicePaymentLink from '@remio/design-system/lib/dashboard/invoice/get-invoice-payment-link'
import { Button } from '@remio/design-system/components/ui/button'
import { Link } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@remio/design-system/components/ui/tooltip'

export default function InvoicePaymentLinkGo({
  invoice,
}: {
  invoice: InvoiceWithClient
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={async (e) => {
            e.stopPropagation()
            const url = await getInvoicePaymentLink(invoice)
            window.open(url, '_blank')
          }}
        >
          <Link className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="px-2 py-1 text-xs">
        Click to open
      </TooltipContent>
    </Tooltip>
  )
}
