import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@rabbit/design-system/components/ui/dialog'
import ClientsNewForm from '../form/clients-form'
import { useState } from 'react'

export default function ClientsNewDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Add a new client to your account.
          </DialogDescription>
        </DialogHeader>
        <ClientsNewForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
