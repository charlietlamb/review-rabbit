import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import { QueryKey } from '@tanstack/react-query'
import { getBusinesses } from '@rabbit/design-system/actions/business/get-businesses'
import { businessesAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atom'
import InfiniteScroll from '@rabbit/design-system/components/misc/infinite-scroll'

export default function Businesses() {
  const {
    items: businesses,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.BUSINESS as QueryKey,
    fetchFn: (page) => getBusinesses(page),
    atom: businessesAtom,
  })
  if (!businesses.length)
    return (
      <div className="text-sm text-muted-foreground pb-4">
        No businesses found. You can create one by pressing the button below.
      </div>
    )
  return (
    <InfiniteScroll
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    >
      <div className="flex flex-col">
        {businesses.map((business) => (
          <div key={business.id}>{business.name}</div>
        ))}
      </div>
    </InfiniteScroll>
  )
}
