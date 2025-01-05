import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useState } from 'react'

export default function DangerDialog({
  title,
  description,
  variant = 'destructive',
  onClick,
  children,
}: {
  title: string
  description: string
  variant?: 'destructive' | 'shine'
  onClick: () => void
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onClick()
              setIsOpen(false)
            }}
            variant={variant}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
