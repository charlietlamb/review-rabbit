import { Billing } from '@rabbit/design-system/components/dashboard/settings/billing/billing'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'
import { getStripeDetails } from '@rabbit/stripe/lib/get-stripe-details'
import { auth } from '@rabbit/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function BillingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const subscription = await getStripeDetails(session.user.id)

  return (
    <DashboardWrap
      title="Billing"
      subtitle="Manage your subscription and billing settings"
    >
      <Billing subscription={subscription} />
    </DashboardWrap>
  )
}
