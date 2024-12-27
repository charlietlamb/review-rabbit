import { Label } from '@burse/design-system/components/ui/label'
import { cn } from '@burse/design-system/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@burse/design-system/components/ui/tooltip'
import Required from '@burse/design-system/components/form/required'

export default function RequiredLabel({
  className,
  htmlFor,
  children,
  required = true,
}: {
  className?: string
  htmlFor?: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Label
          className={cn('font-heading font-bold w-fit', className)}
          htmlFor={htmlFor}
        >
          {children}
          {required && <Required />}
        </Label>
      </TooltipTrigger>
      <TooltipContent>{children} is required.</TooltipContent>
    </Tooltip>
  )
}
