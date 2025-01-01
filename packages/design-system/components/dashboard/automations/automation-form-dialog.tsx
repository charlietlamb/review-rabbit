import {
  Dialog,
  DialogContent,
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
  client,
}: {
  children: React.ReactNode
  automation?: Automation
  client?: Client
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Automation</DialogTitle>
        </DialogHeader>
      </DialogContent>
      <AutomationForm automation={automation} client={client} />
    </Dialog>
  )
}
