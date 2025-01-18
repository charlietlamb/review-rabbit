import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@rabbit/design-system/components/ui/dialog'
import ClientsNewForm from '../form/clients-form'
import { ClientWithReviewMatches } from '@rabbit/database'
import { useState } from 'react'

export default function ClientsEditDialog({
  client,
  children,
}: {
  client: ClientWithReviewMatches
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Edit the details of {client.name}.
          </DialogDescription>
        </DialogHeader>
        <ClientsNewForm client={client} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
