import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerChevrons,
  SelectValue,
} from '@burse/design-system/components/ui/select'
import { useAtom } from 'jotai'
import {
  stripeConnectIdAtom,
  stripeConnectsAtom,
} from '@burse/design-system/atoms/dashboard/stripe/stripe-atoms'
import { QueryKey } from '@tanstack/react-query'
import { QUERY_KEYS } from '@burse/design-system/data/query-keys'
import { getStripeConnects } from '@burse/design-system/actions/stripe-connects/get-stripe-connects'
import { useInfiniteQueryWithAtom } from '@burse/design-system/hooks/use-infinite-query-with-atom'
import Spinner from '@burse/design-system/components/misc/spinner'
import InfiniteScroll from '@burse/design-system/components/misc/infinite-scroll'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@burse/design-system/components/ui/button'
import { connectStripe } from '@burse/design-system/actions/stripe/connect'

export default function DashboardBreadcrumbStripe() {
  const [stripeConnectId, setStripeConnectId] = useAtom(stripeConnectIdAtom)
  const [isConnectLoading, setIsConnectLoading] = useState(false)
  const {
    items: stripeConnects,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.STRIPE_CONNECTS_BREADCRUMB as QueryKey,
    fetchFn: (page) => getStripeConnects(page),
    atom: stripeConnectsAtom,
  })

  const handleConnect = useCallback(async () => {
    try {
      setIsConnectLoading(true)
      const result = await connectStripe()

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl
      } else if (result.error) {
        console.error('Failed to get OAuth URL:', result.error)
      }
    } catch (error) {
      console.error('Error connecting to Stripe:', error)
    } finally {
      setIsConnectLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!stripeConnectId) {
      setStripeConnectId(stripeConnects[0]?.id)
    }
  }, [stripeConnects])

  return (
    <Select defaultValue={stripeConnectId || undefined}>
      <SelectTriggerChevrons
        id="select-stripe"
        aria-label="Select stripe account"
      >
        <SelectValue placeholder="Select stripe account" />
      </SelectTriggerChevrons>
      <SelectContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Spinner />
          </div>
        ) : stripeConnects.length > 0 ? (
          <InfiniteScroll
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          >
            {stripeConnects.map((stripeConnect) => (
              <SelectItem key={stripeConnect.id} value={stripeConnect.id}>
                {stripeConnect.title}
              </SelectItem>
            ))}
          </InfiniteScroll>
        ) : (
          <div className="flex items-center justify-center p-4 flex-col">
            <p className="text-muted-foreground">
              No stripe accounts found. Please connect a stripe account.
            </p>
            <Button
              variant="shine"
              className="mt-2 w-full"
              onClick={handleConnect}
              disabled={isConnectLoading}
            >
              {isConnectLoading ? <Spinner /> : 'Connect'}
            </Button>
          </div>
        )}
      </SelectContent>
    </Select>
  )
}
