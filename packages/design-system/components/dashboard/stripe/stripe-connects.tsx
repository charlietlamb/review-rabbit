'use client'

import { getStripeConnects } from '@burse/design-system/actions/stripe-connects/get-stripe-connects'
import { useInfiniteQueryWithAtom } from '@burse/design-system/hooks/use-infinite-query-with-atom'
import {
  stripeConnectsAtom,
  stripeConnectsSearchAtom,
} from '@burse/design-system/atoms/dashboard/stripe/stripe-atoms'
import InfiniteScroll from '@burse/design-system/components/misc/infinite-scroll'
import StripeConnect from './stripe-connect'
import Spinner from '@burse/design-system/components/misc/spinner'

export default function StripeConnects() {
  const {
    items: stripeConnects,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: ['stripe-connects'],
    fetchFn: (page) => getStripeConnects(page),
    atom: stripeConnectsAtom,
    searchAtom: stripeConnectsSearchAtom,
  })
  if (isLoading)
    return (
      <div className="py-4 flex items-center justify-center">
        <Spinner />
      </div>
    )
  if (stripeConnects.length === 0)
    return (
      <div className="flex items-center justify-center py-4">
        No stripe connects found
      </div>
    )
  return (
    <InfiniteScroll
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    >
      {stripeConnects.map((stripeConnect) => (
        <StripeConnect key={stripeConnect.id} stripeConnect={stripeConnect} />
      ))}
    </InfiniteScroll>
  )
}
