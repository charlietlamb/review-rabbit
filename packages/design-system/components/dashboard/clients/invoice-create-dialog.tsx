import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@remio/design-system/components/ui/dialog'
import { Client } from '@remio/database'
import { useState } from 'react'
import InvoiceForm from '../payments/invoice-form'
import { useRouter } from 'next/navigation'

export default function InvoiceCreateDialog({
  client,
  route = false,
  children,
}: {
  client: Client
  route?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
