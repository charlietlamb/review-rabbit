import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@remio/design-system/components/ui/card'
import { OverviewRecentPayments } from './overview-recent-payments'
import { Button } from '@remio/design-system/components/ui/button'
import { useRouter } from 'next/navigation'

export default function OverviewRecentPaymentsCard() {
  const router = useRouter()
  return (
    <Card className="flex flex-col divide-y">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Payments</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/dashboard/invoices/manage')}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <OverviewRecentPayments />
      </CardContent>
    </Card>
  )
}
