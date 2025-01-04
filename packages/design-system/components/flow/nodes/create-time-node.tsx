import { memo } from 'react'
import BaseNode from './base-node'
import { Clock } from 'lucide-react'
import TimeFormDialog from '../form/time/time-form-dialog'
import { useSetAtom } from 'jotai'
import { levelAtom } from '@rabbit/design-system/atoms/flow/flow-atoms'
import { CustomNode } from '../lib/types'

export default memo((node: CustomNode) => {
  const setLevel = useSetAtom(levelAtom)
  return (
    <TimeFormDialog onClick={() => setLevel(node.data.level)}>
      <BaseNode
        label="Add Time Delay"
        className="bg-emerald-500/20 hover:bg-emerald-500/30 border-none text-left"
        icon={<Clock />}
        iconClassName="bg-emerald-500/20 text-emerald-500"
        hideSource
      >
        Add a delay to your messages in order to send trigger more automatoins
        at a later time.
      </BaseNode>
    </TimeFormDialog>
  )
})
