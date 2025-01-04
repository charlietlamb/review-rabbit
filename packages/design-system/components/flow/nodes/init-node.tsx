import { memo } from 'react'
import BaseNode from './base-node'
import { Rocket } from 'lucide-react'
import { CustomNode } from '../lib/types'

export default memo((node: CustomNode) => {
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
})
