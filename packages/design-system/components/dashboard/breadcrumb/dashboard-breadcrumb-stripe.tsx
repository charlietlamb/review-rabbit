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
import { handleConnect } from '@burse/design-system/lib/stripe/handle-connect'

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

  useEffect(() => {
    if (!stripeConnectId) {
      setStripeConnectId(stripeConnects[0]?.id)
    }
  }, [stripeConnects])

  if (isLoading) return <Spinner className="mx-2" />

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
          <div className="flex flex-col">
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
            <Button
              variant="shine"
              className="mt-2 w-full py-1"
              onClick={handleConnect}
              disabled={isConnectLoading}
            >
              {isConnectLoading ? <Spinner /> : 'Connect new account'}
            </Button>
          </div>
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
