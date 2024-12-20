import { InvoiceWithClient } from '@remio/database/schema/invoices'
import ClientAvatar from '@remio/design-system/components/dashboard/clients/client-avatar'
import { format } from 'date-fns'
import { Button } from '@remio/design-system/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function OverviewRecentPayment({
  payment,
}: {
  payment: InvoiceWithClient
}) {
  const router = useRouter()
  return (
    <div className="flex items-center">
      <ClientAvatar client={payment.client} />
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {payment.client.name}
        </p>
        <p className="text-sm text-muted-foreground">{payment.client.email}</p>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <div className="font-bold">+£{payment.amount}</div>
        <p className="text-sm text-muted-foreground">
          {format(payment.paidAt ?? payment.createdAt, 'dd MMM yyyy')}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-2"
        onClick={() => router.push(`/dashboard/invoice/${payment.id}`)}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
