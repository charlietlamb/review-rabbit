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

export default function StripeProducts() {
  const {
    items: stripeProducts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.STRIPE_PRODUCTS as QueryKey,
    fetchFn: (page) => getStripeProducts(page),
    atom: stripeProductsAtom,
    searchAtom: stripeProductsSearchAtom,
  })

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
