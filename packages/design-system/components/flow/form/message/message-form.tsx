import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import {
  MessageType,
  MESSAGE_TYPES,
  NODE_TYPES,
  MessageNodeData,
} from '../../lib/types'
import { useState } from 'react'
import MessageTypeSelect from './message-type-select'
import TextareaInputState from '@rabbit/design-system/components/form/input/textarea-input-state'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  levelAtom,
  manageNodesAtom,
  nodesAtom,
  isCreateModeAtom,
} from '@rabbit/design-system/atoms/flow/flow-atoms'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { calculateNodePosition } from '../../lib/add-create-nodes'
import { CustomNode } from '../../lib/types'
import InputWithIconState from '@rabbit/design-system/components/form/input/input-with-icon-state'
import { MailIcon } from 'lucide-react'

const VERTICAL_SPACING = 200

export default function MessageForm({
  onSuccess,
  node,
}: {
  onSuccess?: () => void
  node?: CustomNode
}) {
  const data = node?.data as MessageNodeData | undefined
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const [type, setType] = useState<MessageType>(
    data?.messageType || MESSAGE_TYPES.EMAIL
  )
  const level = useAtomValue(levelAtom)
  const nodes = useAtomValue(nodesAtom)
  const setNodes = useSetAtom(nodesAtom)
  const setManageNodes = useSetAtom(manageNodesAtom)
  const isCreateMode = useAtomValue(isCreateModeAtom)
  const [content, setContent] = useState(data?.content || '')
  const [subject, setSubject] = useState(data?.subject || '')

  function validate() {
    setAttemptSubmitted(true)
    if (!content.length) {
      toast.error('Content is required', {
        description: 'Please enter a message',
      })
      return false
    }
    if (type === MESSAGE_TYPES.EMAIL && !subject.length) {
      toast.error('Subject is required to send an email', {
        description: 'Please enter a subject',
      })
      return false
    }
    return true
  }

  function calculatePosition() {
    const nodesAtLevel = nodes.filter((node) => node.data.level === level)
    const nodesCount = nodesAtLevel.length

    return {
      x: calculateNodePosition(nodesCount + 1, nodesCount),
      y: (level - 1) * VERTICAL_SPACING,
    }
  }

  function handleSubmit() {
    if (validate()) {
      if (!node) {
        const position = calculatePosition()
        const newNode = {
          id: uuidv4(),
          type: NODE_TYPES.MESSAGE,
          data: {
            content,
            subject,
            messageType: type,
            label: 'Message',
            level,
            type: NODE_TYPES.MESSAGE,
          },
          position,
        }
        if (isCreateMode) {
          setNodes((nodes) => [...nodes, newNode])
        } else {
          setManageNodes((nodes) => [...nodes, newNode])
        }
        toast.success('Successfully added message', {
          description: 'Message added to the flow',
        })
      } else {
        const newNode = {
          ...node,
          data: { ...node.data, content, messageType: type },
        }
        if (isCreateMode) {
          setNodes((nodes) =>
            nodes.map((oldNode) =>
              oldNode.id === node?.id ? newNode : oldNode
            )
          )
        } else {
          setManageNodes((nodes) =>
            nodes.map((oldNode) =>
              oldNode.id === node?.id ? newNode : oldNode
            )
          )
        }
      }
      onSuccess?.()
    }
  }

  return (
    <FormProvider value={{ attemptSubmitted }}>
      <MessageTypeSelect type={type} setType={setType} />
      {type === MESSAGE_TYPES.EMAIL && (
        <InputWithIconState
          type="text"
          value={subject}
          onChange={setSubject}
          name="subject"
          label="Subject"
          placeholder="Enter your subject..."
          required
          icon={<MailIcon />}
        />
      )}
      <TextareaInputState
        value={content}
        setValue={setContent}
        name="content"
        label="Content"
        placeholder="Enter your message..."
        required
        textAreaClassName="min-h-60"
      />
      <Button variant="shine" className="w-full" onClick={handleSubmit}>
        {isCreateMode ? 'Add Message' : 'Update Message'}
      </Button>
    </FormProvider>
  )
}
