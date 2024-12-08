import OverviewRecentPayment from './overview-recent-payment'
import { useAtomValue } from 'jotai'
import { recentPaymentsAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'

export function OverviewRecentPayments() {
  const recentPayments = useAtomValue(recentPaymentsAtom)
  return (
    <div className="flex flex-col gap-8">
      {recentPayments.map((payment) => (
        <OverviewRecentPayment payment={payment} />
      ))}
    </div>
  )
}
