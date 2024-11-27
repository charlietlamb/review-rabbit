import { Button } from '@dubble/design-system/components/ui/button'
import { cn } from '@dubble/design-system/lib/utils'

export default function DashboardConnectButton({
  className,
}: {
  className?: string
}) {
  return (
    <Button
      className={cn('w-full font-heading', className)}
      variant="shine"
      colors="none"
    >
      Connect
    </Button>
  )
}
