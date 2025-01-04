import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import { MessageType, MESSAGE_TYPES } from '../../lib/types'
import { useState } from 'react'
import MessageTypeSelect from './message-type-select'

export default function FlowForm() {
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const [type, setType] = useState<MessageType>(MESSAGE_TYPES.EMAIL)
  return (
    <FormProvider value={{ attemptSubmitted }}>
      <MessageTypeSelect type={type} setType={setType} />
    </FormProvider>
  )
}
