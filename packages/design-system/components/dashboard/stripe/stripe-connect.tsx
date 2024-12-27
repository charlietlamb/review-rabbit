import { StripeConnect as StripeConnectType } from '@burse/database/schema/stripe-connects'
import { Button } from '@burse/design-system/components/ui/button'
import Spinner from '@burse/design-system/components/misc/spinner'
import { ExternalLink } from 'lucide-react'
import { useCallback, useState } from 'react'
import { deauthorizeStripeConnect } from '@burse/design-system/actions/stripe-connects/deauthorize'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function StripeConnect({
  stripeConnect,
}: {
  stripeConnect: StripeConnectType
}) {
  const [disconnecting, setDisconnecting] = useState(false)
  const queryClient = useQueryClient()

  const handleDisconnect = useCallback(async () => {
    setDisconnecting(true)
    const result = await deauthorizeStripeConnect(stripeConnect.id)
    if (result) {
      toast.success('Stripe account disconnected successfully', {
        description: 'You can connect another Stripe account at any time',
      })
    } else {
      toast.error('Failed to disconnect Stripe account')
    }
    await queryClient.invalidateQueries({
      queryKey: ['stripe-connects'],
    })
    setDisconnecting(false)
  }, [queryClient, stripeConnect.id])

  return (
    <div className="flex w-full items-center justify-between p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-muted-foreground">
          Connected Account
        </div>
        <div className="text-sm">{stripeConnect.stripeUserId}</div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            window.open(
              `https://dashboard.stripe.com/${stripeConnect.stripeUserId}`,
              '_blank'
            )
          }}
          className="flex items-center gap-2"
        >
          Dashboard
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDisconnect}
          disabled={disconnecting}
        >
          {disconnecting ? <Spinner /> : 'Disconnect'}
        </Button>
      </div>
    </div>
  )
}
