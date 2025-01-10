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
import Spinner from './spinner'

export default function DangerDialog({
  title,
  description,
  loading = false,
  variant = 'destructive',
  onClick,
  children,
}: {
  title: string
  description: string
  loading?: boolean
  variant?: 'destructive' | 'shine'
  onClick: () => Promise<void> | void
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
            onClick={async () => {
              await onClick()
              setIsOpen(false)
            }}
            variant={variant}
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
