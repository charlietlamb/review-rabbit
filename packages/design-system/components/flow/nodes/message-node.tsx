import { memo } from 'react'
import { MessageNodeData } from '../lib/types'
import BaseNode from './base-node'
import { MESSAGE_TYPE_DATA } from '../form/message/message-type-data'
import { CustomNode } from '../lib/types'
import MessageFormDialog from '../form/message/message-form-dialog'
import { useSetAtom } from 'jotai'
import { levelAtom } from '@rabbit/design-system/atoms/flow/flow-atoms'

export default memo((node: CustomNode) => {
  const data = node.data as MessageNodeData
  const setLevel = useSetAtom(levelAtom)
  return (
    <MessageFormDialog onClick={() => setLevel(node.data.level)} node={node}>
      <BaseNode
        label={MESSAGE_TYPE_DATA[data.messageType].flowLabel}
        icon={MESSAGE_TYPE_DATA[data.messageType].icon}
        className="text-left"
        iconClassName="bg-primary/20 text-primary"
      >
        {MESSAGE_TYPE_DATA[data.messageType].flowDescription}
      </BaseNode>
    </MessageFormDialog>
  )
})
