import {
  MessageType,
  MESSAGE_TYPES,
} from '@rabbit/design-system/components/flow/lib/types'
import MessageTypeOption from './message-type-option'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'
import { useAtomValue } from 'jotai'
import { isDemoAtom } from '@rabbit/design-system/atoms/flow/flow-atoms'

export default function MessageTypeSelect({
  type,
  setType,
}: {
  type: MessageType
  setType: (type: MessageType) => void
}) {
  const isDemo = useAtomValue(isDemoAtom)
  return (
    <div className="flex flex-col gap-2">
      <RequiredLabel>Message Type</RequiredLabel>
      <div className="grid grid-cols-3 gap-2">
        {Object.values(MESSAGE_TYPES).map((messageType) => (
          <MessageTypeOption
            selected={type === messageType}
            key={messageType}
            type={messageType}
            setType={setType}
            disabled={isDemo && messageType !== MESSAGE_TYPES.EMAIL}
          />
        ))}
      </div>
    </div>
  )
}
