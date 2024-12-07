import client from '@remio/design-system/lib/client'
import StripeSettings from '@remio/design-system/components/dashboard/settings/stripe/StripeSettings'
import { SelectStripeConnectSchema } from '@remio/database'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'

export default async function StripeSettingsPage() {
  const response = await client.stripe.connect.get.$get(
    {},
    await headersWithCookies()
  )
  const stripeAccounts = await response.json()
  if ('error' in stripeAccounts)
    console.error(
      'error' in stripeAccounts
        ? stripeAccounts.error
        : 'Unknown error getting Stripe Connect account'
    )

  return (
    <StripeSettings
      stripeAccounts={stripeAccounts as SelectStripeConnectSchema | undefined}
    />
  )
}
