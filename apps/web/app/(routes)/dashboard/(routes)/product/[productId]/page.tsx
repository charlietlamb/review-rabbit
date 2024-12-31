import { getStripeProductById } from '@rabbit/design-system/actions/stripe-products/get-stripe-product-by-id'
import Product from '@rabbit/design-system/components/dashboard/product/product'

export default async function page({
  params,
}: {
  params: { productId: string }
}) {
  const { productId } = await params
  const product = await getStripeProductById(productId)
  return <Product product={product} />
}
