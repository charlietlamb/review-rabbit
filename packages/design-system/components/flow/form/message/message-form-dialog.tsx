import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'

export default function FlowFormDialog({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Flow Form</DialogTitle>
          <DialogDescription>
            This is a form for creating a flow.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
