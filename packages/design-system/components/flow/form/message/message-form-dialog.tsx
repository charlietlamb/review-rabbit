import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'
import MessageForm from './message-form'
import { useState } from 'react'
import { CustomNode } from '../../lib/types'

export default function FlowFormDialog({
  node,
  onClick,
  children,
}: {
  node?: CustomNode
  onClick?: () => void
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => {
          onClick?.()
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Flow Form</DialogTitle>
          <DialogDescription>
            This is a form for creating a flow.
          </DialogDescription>
        </DialogHeader>
        <MessageForm onSuccess={() => setOpen(false)} node={node} />
      </DialogContent>
    </Dialog>
  )
}
