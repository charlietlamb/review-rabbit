import { Button } from '@remio/design-system/components/ui/button'
import { useAtomValue } from 'jotai'
import { stripeConnectAtom } from '@remio/design-system/atoms/dashboard/settings/stripe/stripe-atoms'
import { connectStripeRefresh } from '@remio/design-system/actions/stripe/connect-stripe-refresh'
import { toast } from 'sonner'

export default function StripeSettingsOnboarding() {
  const stripeConnect = useAtomValue(stripeConnectAtom)
  return (
    <div className="flex flex-col gap-4">
      <p>
        Please finish your stripe onboarding. Click the button below to connect
        your stripe account.
      </p>
      <Button
        onClick={() => {
          if (stripeConnect?.id) {
            toast.info('Redirecting to stripe...', {
              description: 'This may take a few seconds.',
            })
            connectStripeRefresh(stripeConnect.id)
          } else {
            toast.error('No stripe connect id found.', {
              description: 'Please contact support.',
            })
          }
        }}
      >
        Connect Stripe Account
      </Button>
    </div>
  )
}
