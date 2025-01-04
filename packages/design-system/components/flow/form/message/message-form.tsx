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
  nodesAtom,
} from '@rabbit/design-system/atoms/flow/flow-atoms'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { calculateNodePosition } from '../../lib/add-create-nodes'
import { CustomNode } from '../../lib/types'

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
  const [content, setContent] = useState(data?.content || '')

  function validate() {
    if (!content.length) {
      setAttemptSubmitted(true)
      return false
    }
    return true
  }

  function calculatePosition() {
    // Get nodes at the current level
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
        setNodes((nodes) => [
          ...nodes,
          {
            id: uuidv4(),
            type: NODE_TYPES.MESSAGE,
            data: {
              content,
              messageType: type,
              label: 'Message',
              level,
              type: NODE_TYPES.MESSAGE,
            },
            position,
          },
        ])
        toast.success('Successfully added message', {
          description: 'Message added to the flow',
        })
      } else {
        setNodes((nodes) =>
          nodes.map((oldNode) =>
            oldNode.id === node?.id
              ? {
                  ...oldNode,
                  data: { ...oldNode.data, content, messageType: type },
                }
              : oldNode
          )
        )
      }
      onSuccess?.()
    }
  }

  return (
    <FormProvider value={{ attemptSubmitted }}>
      <MessageTypeSelect type={type} setType={setType} />
      <TextareaInputState
        value={content}
        setValue={setContent}
        name="content"
        label="Content"
        placeholder="Enter your message..."
        required
      />
      <Button variant="shine" className="w-full" onClick={handleSubmit}>
        Add Action
      </Button>
    </FormProvider>
  )
}
