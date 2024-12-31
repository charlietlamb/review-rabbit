import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useState } from 'react'

export default function DangerDialog({
  title,
  description,
  onClick,
  children,
}: {
  title: string
  description: string
  onClick: () => void
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onClick()
              setIsOpen(false)
            }}
            variant="destructive"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
