import { Label } from '@ff/design-system/components/ui/label'
import { cn } from '@ff/design-system/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ff/design-system/components/ui/tooltip'

export default function RequiredLabel({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Label className={cn('font-heading font-bold w-fit', className)}>
          {children}
          <span className="text-destructive">*</span>
        </Label>
      </TooltipTrigger>
      <TooltipContent>{children} is required.</TooltipContent>
    </Tooltip>
  )
}
