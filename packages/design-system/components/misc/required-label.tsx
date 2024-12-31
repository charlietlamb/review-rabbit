import { Label } from '@rabbit/design-system/components/ui/label'
import { cn } from '@rabbit/design-system/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@rabbit/design-system/components/ui/tooltip'
import Required from '@rabbit/design-system/components/form/required'

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
          className={cn('font-heading font-bold w-fit text-base', className)}
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
