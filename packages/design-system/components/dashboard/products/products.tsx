'use client'

import { Button } from '@burse/design-system/components/ui/button'
import DashboardContentHeader from '../header/dashboard-content-header'
import StripeProducts from './stripe-products'
import EditProductDialog from './edit-product-dialog'

export default function Products() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Products"
        subtitle="Manage your stripe products"
      />
      <div className="p-4 flex flex-col gap-2">
        <p className="font-heading">Your connected stripe accounts</p>
        <StripeProducts />
        <EditProductDialog>
          <Button variant="shine" className="mt-2 w-full">
            Add a product
          </Button>
        </EditProductDialog>
      </div>
    </div>
  )
}
