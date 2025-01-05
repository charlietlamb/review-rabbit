import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'
import AutomationForm from './automation-form'
import { Automation } from '@rabbit/database/schema/app/automations'
import { Client } from '@rabbit/database/schema/app/clients'

export default function AutomationFormDialog({
  children,
  automation,
}: {
  children: React.ReactNode
  automation?: AutomationWithItems
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Automation</DialogTitle>
          <DialogDescription>
            Schedule an email, text or whatsapp message to your clients.
          </DialogDescription>
        </DialogHeader>
        <AutomationForm automation={automation} client={client} />
      </DialogContent>
    </Dialog>
  )
}
