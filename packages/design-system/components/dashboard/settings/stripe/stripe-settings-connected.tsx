import { Button } from '@burse/design-system/components/ui/button'
import { useAtomValue } from 'jotai'
import { stripeConnectAtom } from '@burse/design-system/atoms/dashboard/settings/stripe/stripe-atoms'

export default function StripeSettingsConnected() {
  const stripeConnect = useAtomValue(stripeConnectAtom)
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading font-bold">Stripe Account Connected</h1>
      <p className="text-muted-foreground">
        You&apos;re already connected to stripe and ready to receive payments.
      </p>
      <p>
        Account ID: <span className="font-bold">{stripeConnect?.id}</span>
      </p>
      <Button variant="shine" className="font-bold font-heading">
        Manage Stripe Account
      </Button>
    </div>
  )
}
