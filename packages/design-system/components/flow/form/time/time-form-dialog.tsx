import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'
import { useState } from 'react'
import TimeForm from './time-form'
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
          <DialogTitle>Add Time Delay</DialogTitle>
          <DialogDescription>
            Add a time delay to the flow. Add the number of days, hours &
            minutes you'd like to delay.
          </DialogDescription>
        </DialogHeader>
        <TimeForm node={node} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
