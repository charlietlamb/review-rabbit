import client from '@burse/design-system/lib/client'
import StripeSettings from '@burse/design-system/components/dashboard/settings/stripe/stripe-settings'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export default async function StripeSettingsPage({
  searchParams,
}: {
  searchParams: { success?: string }
}) {
  const response = await client.stripe.connect.get.$get(
    {},
    await headersWithCookies()
  )

  const json = await response.json()
  if ('error' in json)
    console.error(
      'error' in json
        ? json.error
        : 'Unknown error getting Stripe Connect account'
    )

  const { success } = await searchParams

  return (
    <StripeSettings
      stripeAccount={'account' in json ? json.account : undefined}
      success={success}
    />
  )
}
