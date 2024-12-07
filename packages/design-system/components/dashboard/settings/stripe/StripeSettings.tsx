import { SelectStripeConnectSchema } from '@remio/database'
import DashboardContentHeader from '@remio/design-system/components/dashboard/header/dashboard-content-header'
import StripeSettingsConnect from './StripeSettingsConnect'

export default function StripeSettings({
  stripeAccount,
}: {
  stripeAccount: SelectStripeConnectSchema | undefined
}) {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Stripe Settings"
        subtitle="Manage how you receive payments"
      />
      <div className="flex flex-col gap-4 p-4">
        {stripeAccount ? (
          <div>{stripeAccount.id}</div>
        ) : (
          <StripeSettingsConnect />
        )}
      </div>
    </div>
  )
}
