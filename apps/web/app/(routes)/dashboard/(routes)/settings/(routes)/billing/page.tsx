import { Billing } from '@rabbit/design-system/components/dashboard/settings/billing/billing'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'

export default async function BillingPage() {
  return (
    <DashboardWrap
      title="Billing"
      subtitle="Manage your subscription and billing settings"
    >
      <Billing />
    </DashboardWrap>
  )
}
