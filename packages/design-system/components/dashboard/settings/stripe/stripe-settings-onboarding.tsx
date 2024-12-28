import { Button } from '@burse/design-system/components/ui/button'
import { useAtomValue } from 'jotai'
import { stripeConnectIdAtom } from '@burse/design-system/atoms/dashboard/stripe/stripe-atoms'
import { connectStripeRefresh } from '@burse/design-system/actions/stripe/connect-stripe-refresh'
import { toast } from 'sonner'

export default function StripeSettingsOnboarding() {
  const stripeConnectId = useAtomValue(stripeConnectIdAtom)
  return (
    <div className="flex flex-col gap-4">
      <p>
        Please finish your stripe onboarding. Click the button below to connect
        your stripe account.
      </p>
      <Button
        onClick={() => {
          if (stripeConnectId) {
            toast.info('Redirecting to stripe...', {
              description: 'This may take a few seconds.',
            })
            connectStripeRefresh(stripeConnectId)
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
