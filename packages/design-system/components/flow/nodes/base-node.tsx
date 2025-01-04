import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Label } from '@rabbit/design-system/components/ui/label'
import { cn } from '@rabbit/design-system/lib/utils'

export default memo(
  ({
    label,
    className,
    hideSource = false,
    hideTarget = false,
    icon,
    iconClassName,
    children,
  }: {
    label: string
    className?: string
    hideSource?: boolean
    hideTarget?: boolean
    icon?: React.ReactNode
    iconClassName?: string
    children?: React.ReactNode
  }) => {
    return (
      <div
        className={cn(
          'bg-background rounded-lg border flex overflow-hidden gap-2 p-4 w-[400px] transition duration-300',
          className
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center aspect-square rounded-md size-16',
            iconClassName
          )}
        >
          {icon}
        </div>
        <div>
          <Label className="p-1 px-2 font-heading text-lg text-center">
            {label}
          </Label>
          <div className="flex flex-col p-2 text-muted-foreground">
            {children}
            {!hideSource && (
              <Handle type="source" position={Position.Bottom} id="a" />
            )}
            {!hideTarget && (
              <Handle type="target" position={Position.Top} id="b" />
            )}
          </div>
        </div>
      </div>
    )
  }
)
