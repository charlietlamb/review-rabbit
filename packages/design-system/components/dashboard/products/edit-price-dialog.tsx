import { PriceFormSchema } from '@burse/design-system/types/stripe/prices'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@burse/design-system/components/ui/dialog'
import PriceForm from './price-form'
import { Button } from '@burse/design-system/components/ui/button'
import { useState } from 'react'

export default function EditPriceDialog({
  price,
  setPrice,
  children,
}: {
  price: PriceFormSchema
  setPrice: (price: PriceFormSchema) => void
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit price</DialogTitle>
        </DialogHeader>
        <PriceForm price={price} setPrice={setPrice} />
        <Button
          variant="shine"
          className="w-full"
          onClick={() => setOpen(false)}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  )
}
