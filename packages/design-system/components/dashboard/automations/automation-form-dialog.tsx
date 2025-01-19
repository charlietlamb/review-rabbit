import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'
import AutomationForm from './automation-form'
import { useState } from 'react'
import { ClientWithData } from '@rabbit/database/schema/app/clients'

export default function AutomationFormDialog({
  selectedClients = [],
  children,
}: {
  selectedClients?: ClientWithData[]
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Automation</DialogTitle>
          <DialogDescription>
            Schedule an email, text or whatsapp message to your clients.
          </DialogDescription>
        </DialogHeader>
        <AutomationForm
          onSuccess={() => setOpen(false)}
          selectedClientsInitial={selectedClients}
        />
      </DialogContent>
    </Dialog>
  )
}
