import { StripeProductWithData } from '@burse/database/schema/stripe/stripe-products'
import ProductForm from './product-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@burse/design-system/components/ui/dialog'
import { useState } from 'react'
export default function EditProductDialog({
  product,
  children,
}: {
  product?: StripeProductWithData
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a product</DialogTitle>
        </DialogHeader>
        <ProductForm product={product} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
