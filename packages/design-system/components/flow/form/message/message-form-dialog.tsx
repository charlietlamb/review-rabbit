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
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Send A Message</DialogTitle>
          <DialogDescription>Send a message to a user.</DialogDescription>
        </DialogHeader>
        <MessageForm onSuccess={() => setOpen(false)} node={node} />
      </DialogContent>
    </Dialog>
  )
}
