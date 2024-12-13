import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@remio/design-system/components/ui/card'
import { OverviewRecentPayments } from './overview-recent-payments'
import { useAtomValue } from 'jotai'
import { recentPaymentsAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'

export default function OverviewRecentPaymentsCard() {
  const recentPayments = useAtomValue(recentPaymentsAtom)
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <CardDescription>
          You made £
          {recentPayments.reduce(
            (acc, payment) => acc + Number(payment.amount),
            0
          )}{' '}
          in the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OverviewRecentPayments />
      </CardContent>
    </Card>
  )
}
