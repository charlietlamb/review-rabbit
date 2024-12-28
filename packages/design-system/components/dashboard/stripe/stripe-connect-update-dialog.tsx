import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@burse/design-system/components/ui/dialog'
import { Input } from '@burse/design-system/components/ui/input'
import { Button } from '@burse/design-system/components/ui/button'
import { useState } from 'react'
import { updateStripeConnect } from '@burse/design-system/actions/stripe-connects/update-stripe-connect'
import { StripeConnect } from '@burse/database/schema/stripe-connects'
import Spinner from '@burse/design-system/components/misc/spinner'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { QUERY_KEYS } from '@burse/design-system/data/query-keys'

export default function StripeConnectUpdateDialog({
  stripeConnect,
  children,
}: {
  stripeConnect: StripeConnect
  children: React.ReactNode
}) {
  const [title, setTitle] = useState(stripeConnect.title)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  function handleUpdate() {
    async function update() {
      setIsLoading(true)
      const result = await updateStripeConnect(stripeConnect.id, title)
      if (result) {
        toast.success('Successfully updated stripe connect.')
      } else {
        toast.error('Failed to update stripe connect.')
      }
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.STRIPE_CONNECTS,
      })
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.STRIPE_CONNECTS_BREADCRUMB,
      })
      setOpen(false)
      setIsLoading(false)
    }
    update()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Stripe Connect</DialogTitle>
        <DialogDescription>
          Update the title of the stripe connect
        </DialogDescription>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="shine" onClick={handleUpdate}>
          {isLoading ? <Spinner /> : 'Update'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
