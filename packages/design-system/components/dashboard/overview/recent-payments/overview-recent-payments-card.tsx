import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@remio/design-system/components/ui/card'
import { OverviewRecentPayments } from './overview-recent-payments'
import { Button } from '@remio/design-system/components/ui/button'
import { useRouter } from 'next/navigation'
import { Wallet } from 'lucide-react'

export default function OverviewRecentPaymentsCard() {
  const router = useRouter()
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pt-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wallet /> Recent Payments
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/dashboard/invoices/manage')}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <OverviewRecentPayments />
      </CardContent>
    </Card>
  )
}
