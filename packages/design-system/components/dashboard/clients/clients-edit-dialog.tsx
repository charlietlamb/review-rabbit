import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@remio/design-system/components/ui/dialog'
import ClientsNewForm from './clients-form'
import { Client } from '@remio/database'
import { useState } from 'react'

export default function ClientsEditDialog({
  client,
  children,
}: {
  client: Client
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Edit the details of {client.name}.
        </DialogDescription>
        <ClientsNewForm client={client} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
