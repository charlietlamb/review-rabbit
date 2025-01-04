import { MessageType } from '@rabbit/design-system/components/flow/lib/types'
import { MESSAGE_TYPE_DATA } from './message-type-data'
export default function MessageTypeOption({
  type,
  setType,
}: {
  type: MessageType
  setType: (type: MessageType) => void
}) {
  const { label, description, icon } = MESSAGE_TYPE_DATA[type]
  return (
    <div>
      <div>{icon}</div>
      <div>{label}</div>
      <div>{description}</div>
    </div>
  )
}
