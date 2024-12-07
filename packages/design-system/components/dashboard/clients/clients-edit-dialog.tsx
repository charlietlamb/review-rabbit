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
import { Client } from '@remio/database'
import { useState } from 'react'
import { Pencil } from 'lucide-react'

export default function ClientsEditDialog({ client }: { client: Client }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="text-muted-foreground" size={16} />
        </Button>
      </DialogTrigger>
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
