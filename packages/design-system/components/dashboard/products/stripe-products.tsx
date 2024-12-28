import { QUERY_KEYS } from '@burse/design-system/data/query-keys'
import { useInfiniteQueryWithAtom } from '@burse/design-system/hooks/use-infinite-query-with-atom'
import { QueryKey } from '@tanstack/react-query'
import { getStripeProducts } from '@burse/design-system/actions/stripe-products/get-stripe-products'
import {
  stripeProductsAtom,
  stripeProductsSearchAtom,
} from '@burse/design-system/atoms/dashboard/products/products-atoms'
import InfiniteScroll from '@burse/design-system/components/misc/infinite-scroll'
import StripeProduct from './stripe-product'
import PageLoading from '@burse/design-system/components/misc/page-loading'
import { useAtomValue } from 'jotai'
import { stripeConnectIdAtom } from '@burse/design-system/atoms/dashboard/stripe/stripe-atoms'
import { Button } from '@burse/design-system/components/ui/button'
import { handleConnect } from '@burse/design-system/lib/stripe/handle-connect'

export default function StripeProducts() {
  const stripeConnectId = useAtomValue(stripeConnectIdAtom)
  const {
    items: stripeProducts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: [QUERY_KEYS.STRIPE_PRODUCTS, stripeConnectId] as QueryKey,
    fetchFn: (page) => getStripeProducts(page, stripeConnectId ?? ''),
    atom: stripeProductsAtom,
    searchAtom: stripeProductsSearchAtom,
  })

  if (!stripeConnectId)
    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">
          No stripe accounts found. You must connect a stripe account to add
          products.
        </p>
        <Button
          variant="outline"
          className="mt-2 w-full font-heading font-bold"
          onClick={handleConnect}
        >
          Connect a stripe account
        </Button>
      </div>
    )

  if (isLoading) return <PageLoading />
  if (stripeProducts.length === 0)
    return (
      <div className="flex items-center justify-center py-4">
        No stripe products found
      </div>
    )
  return (
    <InfiniteScroll
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    >
      {stripeProducts.map((product) => (
        <StripeProduct key={product.id} stripeProduct={product} />
      ))}
    </InfiniteScroll>
  )
}
