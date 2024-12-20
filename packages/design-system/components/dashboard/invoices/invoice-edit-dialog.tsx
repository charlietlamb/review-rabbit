import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@remio/design-system/components/ui/dialog'
import { Client, InvoiceWithClient } from '@remio/database'
import { useState } from 'react'
import InvoiceForm from './invoice-form'
import { useRouter } from 'next/navigation'

export default function InvoiceEditDialog({
  client,
  invoice,
  route = false,
  children,
}: {
  client?: Client
  invoice?: InvoiceWithClient
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
          <DialogTitle>
            {invoice ? 'Edit Invoice' : 'Create Invoice'}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {invoice ? 'Edit an invoice for a client.' : 'Create an invoice.'}
        </DialogDescription>
        <InvoiceForm
          client={client}
          invoice={invoice}
          setIsOpen={setIsOpen}
          onSuccess={
            route ? () => router.push('/dashboard/invoices/manage') : undefined
          }
        />
      </DialogContent>
    </Dialog>
  )
}
