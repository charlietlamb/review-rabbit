import { MessageType } from '@rabbit/design-system/components/flow/lib/types'
import { MESSAGE_TYPE_DATA } from './message-type-data'
import { cn } from '@rabbit/design-system/lib/utils'

export default function MessageTypeOption({
  selected,
  type,
  setType,
}: {
  selected: boolean
  type: MessageType
  setType: (type: MessageType) => void
}) {
  const { label, description, icon } = MESSAGE_TYPE_DATA[type]

  return (
    <div
      className={cn(
        'flex flex-col border rounded-md cursor-pointer divide-y transition-all duration-300',
        selected && 'border-primary'
      )}
      onClick={() => setType(type)}
    >
      <div className="flex p-2 gap-2 items-center">
        <div>{icon}</div>
        <div className="font-bold">{label}</div>
      </div>
      <div className="text-sm text-muted-foreground p-2">{description}</div>
    </div>
  )
}
