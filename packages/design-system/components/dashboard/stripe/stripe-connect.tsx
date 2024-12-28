import { StripeConnect as StripeConnectType } from '@burse/database/schema/stripe-connects'
import { Button } from '@burse/design-system/components/ui/button'
import Spinner from '@burse/design-system/components/misc/spinner'
import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { deauthorizeStripeConnect } from '@burse/design-system/actions/stripe-connects/deauthorize'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import DangerDialog from '@burse/design-system/components/misc/danger-dialog'
import StripeConnectUpdateDialog from './stripe-connect-update-dialog'
import { QUERY_KEYS } from '@burse/design-system/data/query-keys'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@burse/design-system/components/ui/tooltip'

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
      queryKey: QUERY_KEYS.STRIPE_CONNECTS,
    })
    setDisconnecting(false)
  }, [queryClient, stripeConnect.id])

  return (
    <div className="flex w-full items-center justify-between p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-muted-foreground">
          {stripeConnect.stripeUserId}
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm">{stripeConnect.title}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                window.open(
                  `https://dashboard.stripe.com/${stripeConnect.stripeUserId}`,
                  '_blank'
                )
              }}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Stripe Dashboard</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <StripeConnectUpdateDialog stripeConnect={stripeConnect}>
                <Button variant="outline" size="icon" className="p-0.5">
                  <Pencil className="h-4 w-4" />
                </Button>
              </StripeConnectUpdateDialog>
            </div>
          </TooltipTrigger>
          <TooltipContent>Edit Stripe Account</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <DangerDialog
                title="Disconnect Stripe Account"
                description="Are you sure you want to disconnect this Stripe account? This action cannot be undone."
                onClick={handleDisconnect}
              >
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={disconnecting}
                >
                  {disconnecting ? (
                    <Spinner className="size-4" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </Button>
              </DangerDialog>
            </div>
          </TooltipTrigger>
          <TooltipContent>Disconnect Stripe Account</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
