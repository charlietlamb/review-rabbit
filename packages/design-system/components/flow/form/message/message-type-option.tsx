import { MessageType } from '@rabbit/design-system/components/flow/lib/types'
import { MESSAGE_TYPE_DATA } from './message-type-data'
import { cn } from '@rabbit/design-system/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@rabbit/design-system/components/ui/tooltip'

export default function MessageTypeOption({
  selected,
  type,
  setType,
  disabled,
}: {
  selected: boolean
  type: MessageType
  setType: (type: MessageType) => void
  disabled?: boolean
}) {
  const { label, description, icon } = MESSAGE_TYPE_DATA[type]

  const content = (
    <div
      className={cn(
        'flex flex-col border-2 rounded-md cursor-pointer divide-y transition-all duration-300',
        selected && 'border-primary',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={() => !disabled && setType(type)}
    >
      <div className="flex p-2 gap-2 items-center justify-between">
        <div className="font-bold">{label}</div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <div className="text-sm text-muted-foreground p-2">{description}</div>
    </div>
  )

  if (disabled) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent className="max-w-[280px] flex flex-col gap-2 text-center items-center">
          <p className="text-sm text-muted-foreground mt-1">
            This has been disabled for demo purposes. Create a free account to
            access all automation features and start streamlining your reviews
            today.
          </p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
