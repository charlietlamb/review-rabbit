import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@remio/design-system/components/ui/card'
import { OverviewRecentPayments } from './overview-recent-payments'

export default function OverviewRecentPaymentsCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <OverviewRecentPayments />
      </CardContent>
    </Card>
  )
}
