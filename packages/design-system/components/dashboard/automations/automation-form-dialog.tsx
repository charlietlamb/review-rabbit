import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'
import AutomationForm from './automation-form'

export default function AutomationFormDialog({
  children,
}: {
  children: React.ReactNode
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
        <AutomationForm />
      </DialogContent>
    </Dialog>
  )
}
