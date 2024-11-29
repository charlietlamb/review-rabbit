import { Connect } from '@dubble/database'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@dubble/design-system/components/ui/dialog'
import { Button } from '@dubble/design-system/components/ui/button'
import { X } from 'lucide-react'
import { disconnectAccount } from '@dubble/design-system/actions/connect/disconnect-account'
import { toast } from 'sonner'
import Spinner from '@dubble/design-system/components/misc/spinner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@dubble/design-system/lib/utils'

export default function DisconnectDialog({
  connect,
  className,
}: {
  connect: Connect
  className?: string
}) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function disconnect() {
    setLoading(true)
    const result = await disconnectAccount(connect.id)
    if (result) {
      toast.success('Account disconnected', {
        description: 'You can reconnect this account at any time.',
      })
    } else {
      toast.error('Failed to disconnect account', {
        description: 'Please try again later.',
      })
    }
    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          colors="none"
          variant="ghost"
          className={cn('text-red-500', className)}
          size="icon"
        >
          <X className="min-w-6 min-h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disconnect {connect.username}?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Disconnecting {connect.username} will remove their data from your
          account. You can reconnect this {connect.providerId} account at any
          time.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            colors="destructive"
            onClick={disconnect}
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Disconnect'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
