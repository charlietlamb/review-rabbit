import { memo } from 'react'
import { InitNodeData } from '../lib/types'
import BaseNode from './base-node'
import { Rocket } from 'lucide-react'

export default memo(
  ({ data, isConnectable }: { data: InitNodeData; isConnectable: boolean }) => {
    return (
      <BaseNode
        label="Workflow Triggered"
        icon={<Rocket />}
        iconClassName="bg-primary/20 text-primary"
        hideTarget
      >
        Workflow triggered from dashboard.
      </BaseNode>
    )
  }
)
