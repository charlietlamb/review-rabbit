import { Button } from '@ff/design-system/components/ui/button'
import { cn } from '@ff/design-system/lib/utils'

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
