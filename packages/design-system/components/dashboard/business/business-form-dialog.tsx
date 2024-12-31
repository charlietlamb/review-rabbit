import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'
import BusinessForm from './business-form'

export default function BusinessFormDialog({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Business</DialogTitle>
        </DialogHeader>
        <BusinessForm />
      </DialogContent>
    </Dialog>
  )
}
