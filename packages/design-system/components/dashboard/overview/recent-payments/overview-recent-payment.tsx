import { InvoiceWithClient } from '@remio/database/schema/invoices'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@remio/design-system/components/ui/avatar'

export default function OverviewRecentPayment({
  payment,
}: {
  payment: InvoiceWithClient
}) {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={''} alt="Avatar" />
        <AvatarFallback>
          {payment.client.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {payment.client.name}
        </p>
        <p className="text-sm text-muted-foreground">{payment.client.email}</p>
      </div>
      <div className="ml-auto font-medium">£{payment.amount}</div>
    </div>
  )
}
