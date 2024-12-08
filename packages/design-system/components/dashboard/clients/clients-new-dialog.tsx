import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@remio/design-system/components/ui/dialog'
import { Button } from '@remio/design-system/components/ui/button'
import ClientsNewForm from './clients-form'
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
        </DialogHeader>
        <DialogDescription>Add a new client to your account.</DialogDescription>
        <ClientsNewForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
