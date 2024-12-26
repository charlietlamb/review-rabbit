import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@remio/design-system/components/ui/dialog'
import MediationForm from './mediation-form'

export default function NewMediationDialog({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Mediation</DialogTitle>
        </DialogHeader>
        <DialogDescription>Create a new mediation event.</DialogDescription>
        <MediationForm />
      </DialogContent>
    </Dialog>
  )
}
