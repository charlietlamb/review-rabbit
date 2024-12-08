import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@remio/design-system/components/ui/dialog'
import { Button } from '@remio/design-system/components/ui/button'
import { Client } from '@remio/database'
import { useState } from 'react'
import { HandCoins } from 'lucide-react'
import InvoiceForm from '../payments/invoice-form'
import { useRouter } from 'next/navigation'

export default function InvoiceCreateDialog({
  client,
  route = false,
}: {
  client: Client
  route?: boolean
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <HandCoins className="text-muted-foreground" size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Create an invoice for {client.name}.
        </DialogDescription>
        <InvoiceForm
          client={client}
          setIsOpen={setIsOpen}
          onSuccess={
            route ? () => router.push('/dashboard/payments/manage') : undefined
          }
        />
      </DialogContent>
    </Dialog>
  )
}
