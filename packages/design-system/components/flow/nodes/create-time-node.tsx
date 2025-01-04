import { memo } from 'react'
import { InitNodeData } from '../lib/types'
import BaseNode from './base-node'
import { SquarePlus } from 'lucide-react'
import FlowFormDialog from '../form/message/message-form-dialog'

export default memo(
  ({ data, isConnectable }: { data: InitNodeData; isConnectable: boolean }) => {
    return (
      <FlowFormDialog>
        <BaseNode
          label="Add Automation"
          className="bg-emerald-500/20 hover:bg-emerald-500/30 border-none"
          icon={<SquarePlus />}
          iconClassName="bg-emerald-500/20 text-emerald-500"
          hideSource
        >
          Add a delay to your messages. We reccomend this be at least 24 hours.
        </BaseNode>
      </FlowFormDialog>
    )
  }
)
