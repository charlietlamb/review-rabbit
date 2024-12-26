import { InvoiceWithClient } from '@remio/database/schema/invoices'
import ClientAvatar from '@remio/design-system/components/dashboard/clients/client-avatar'
import { format } from 'date-fns'
import { Button } from '@remio/design-system/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@remio/design-system/components/ui/tooltip'

export default function OverviewRecentPayment({
  payment,
}: {
  payment: InvoiceWithClient
}) {
  const router = useRouter()

  return (
    <div className="flex items-center min-w-0">
      <ClientAvatar client={payment.client} size="sm" />
      <div className="ml-4 space-y-1 min-w-0 flex-1">
        <p className="text-sm font-medium leading-none truncate">
          {payment.client.name}
        </p>
        <p className="text-sm text-muted-foreground truncate">
          {payment.client.email}
        </p>
      </div>
      <div className="ml-4 flex flex-col items-end shrink-0">
        <div className="font-bold">+£{payment.amount}</div>
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          {format(payment.paidAt ?? payment.createdAt, 'dd MMM yyyy')}
        </p>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 shrink-0"
            onClick={() => router.push(`/dashboard/invoice/${payment.id}`)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>View Invoice</TooltipContent>
      </Tooltip>
    </div>
  )
}
