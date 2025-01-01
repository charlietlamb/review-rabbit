import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerChevrons,
  SelectValue,
} from '@rabbit/design-system/components/ui/select'
import { useAtom } from 'jotai'
import { QueryKey } from '@tanstack/react-query'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import InfiniteScroll from '@rabbit/design-system/components/misc/infinite-scroll'
import { useEffect } from 'react'
import { Button } from '@rabbit/design-system/components/ui/button'
import { handleConnect } from '@rabbit/design-system/lib/stripe/handle-connect'
import { getBusinesses } from '@rabbit/design-system/actions/business/get-businesses'
import { businessesAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atom'
import BusinessFormDialog from '../business/business-form-dialog'
import { businessIdAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atom'

export default function DashboardBreadcrumbBusiness() {
  const [businessId, setBusinessId] = useAtom(businessIdAtom)
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

  useEffect(() => {
    if (!businessId) {
      setBusinessId(businesses[0]?.id)
    }
    if (businesses.some((business) => business.id === businessId)) return
    setBusinessId(businesses[0]?.id)
  }, [businesses])

  if (isLoading) return <Spinner className="mx-2" />
  if (!businesses.length)
    return (
      <div className="text-sm text-muted-foreground pb-4">
        No businesses found. You can create one by pressing the button below.
      </div>
    )

  return (
    <Select value={businessId || undefined} onValueChange={setBusinessId}>
      <SelectTriggerChevrons
        id="select-business"
        aria-label="Select business"
        className="p-1"
      >
        <SelectValue placeholder="Select business" />
      </SelectTriggerChevrons>
      <SelectContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Spinner />
          </div>
        ) : businesses.length > 0 ? (
          <div className="flex flex-col">
            <InfiniteScroll
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            >
              {businesses.map((business) => (
                <SelectItem key={business.id} value={business.id}>
                  {business.name}
                </SelectItem>
              ))}
            </InfiniteScroll>
            <BusinessFormDialog>
              <Button
                variant="shine"
                className="mt-2 w-full py-1"
                onClick={handleConnect}
              >
                Add new business
              </Button>
            </BusinessFormDialog>
          </div>
        ) : (
          <div className="flex items-center justify-center p-4 flex-col">
            <p className="text-muted-foreground">
              No stripe accounts found. Please connect a stripe account.
            </p>
            <BusinessFormDialog>
              <Button
                variant="shine"
                className="mt-2 w-full py-1"
                onClick={handleConnect}
              >
                Add new business
              </Button>
            </BusinessFormDialog>
          </div>
        )}
      </SelectContent>
    </Select>
  )
}
