import { StripeProductWithData } from '@burse/database/schema/stripe-products'
import ProductForm from './product-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@burse/design-system/components/ui/dialog'

export default function EditProductDialog({
  product,
  children,
}: {
  product?: StripeProductWithData
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a product</DialogTitle>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  )
}
