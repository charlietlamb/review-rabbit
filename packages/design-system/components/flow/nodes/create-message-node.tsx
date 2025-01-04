import { memo } from 'react'
import BaseNode from './base-node'
import { SquarePlus } from 'lucide-react'
import MessageFormDialog from '../form/message/message-form-dialog'
import { useSetAtom } from 'jotai'
import { levelAtom } from '@rabbit/design-system/atoms/flow/flow-atoms'
import { CustomNode } from '../lib/types'

export default memo((node: CustomNode) => {
  const setLevel = useSetAtom(levelAtom)
  return (
    <MessageFormDialog onClick={() => setLevel(node.data.level)}>
      <BaseNode
        label="Add Automation"
        className="bg-emerald-500/20 hover:bg-emerald-500/30 border-none text-left"
        icon={<SquarePlus />}
        iconClassName="bg-emerald-500/20 text-emerald-500"
        hideSource
      >
        Add an automation to your workflow. SMS, WhatsApp, Email, etc.
      </BaseNode>
    </MessageFormDialog>
  )
})
