import { SelectStripeConnectSchema } from '@remio/database'
import DashboardContentHeader from '@remio/design-system/components/dashboard/header/dashboard-content-header'

export default function StripeSettings({
  stripeAccounts,
}: {
  stripeAccounts: SelectStripeConnectSchema | undefined
}) {
  return (
    <div className="flex flex-col gap-4">
      <DashboardContentHeader
        title="Stripe Settings"
        subtitle="Manage how you receive payments"
      />
    </div>
  )
}
