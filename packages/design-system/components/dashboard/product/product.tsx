'use client'

import { StripeProductWithData } from '@burse/database/schema/stripe-products'
import DashboardContentHeader from '../header/dashboard-content-header'
import ProductForm from '../products/product-form'

export default function Product({
  product,
}: {
  product: StripeProductWithData
}) {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title={product.title}
        subtitle={`Edit the details of ${product.title}`}
      />
      <div className="p-4">
        <ProductForm product={product} />
      </div>
    </div>
  )
}
