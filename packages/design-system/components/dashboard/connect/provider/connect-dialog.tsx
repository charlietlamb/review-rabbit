import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@ff/design-system/components/ui/dialog'
import { Button } from '@ff/design-system/components/ui/button'
import { ProviderData } from '@ff/design-system/lib/providers'
import { ConnectButton } from './connect-button'
import { cn } from '@ff/design-system/lib/utils'

export default function ConnectDialog({
  provider,
  className,
  children,
}: {
  provider: ProviderData
  className?: string
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="shine" className={cn('font-heading', className)}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect a new {provider.name} account</DialogTitle>
        </DialogHeader>
        <DialogDescription>{provider.info}</DialogDescription>
        <DialogFooter>
          <ConnectButton providerId={provider.id} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
