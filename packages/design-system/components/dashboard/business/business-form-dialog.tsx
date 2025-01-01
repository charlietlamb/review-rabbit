import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@rabbit/design-system/components/ui/dialog'
import BusinessForm from './business-form'
import { useState } from 'react'
import { Business } from '@rabbit/database/schema/app/businesses'

export default function BusinessFormDialog({
  children,
  business,
}: {
  children: React.ReactNode
  business?: Business
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Business</DialogTitle>
          <DialogDescription>
            Add a new business to your account.
          </DialogDescription>
        </DialogHeader>
        <BusinessForm onSuccess={() => setIsOpen(false)} business={business} />
      </DialogContent>
    </Dialog>
  )
}
