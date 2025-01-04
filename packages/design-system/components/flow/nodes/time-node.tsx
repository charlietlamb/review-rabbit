import { memo } from 'react'
import { TimeNodeData } from '../lib/types'
import BaseNode from './base-node'
import { ClockIcon } from 'lucide-react'
import { CustomNode } from '../lib/types'
import TimeFormDialog from '../form/time/time-form-dialog'
import { useSetAtom } from 'jotai'
import { levelAtom } from '@rabbit/design-system/atoms/flow/flow-atoms'

function formatTimeDelay(minutes: number): string {
  if (!minutes || minutes <= 0) return '0 minutes'

  const days = Math.floor(minutes / (24 * 60))
  const remainingHours = Math.floor((minutes % (24 * 60)) / 60)
  const remainingMinutes = minutes % 60

  const parts: string[] = []
  if (days > 0) parts.push(`${days}${days === 1 ? ' day' : ' days'}`)
  if (remainingHours > 0)
    parts.push(`${remainingHours}${remainingHours === 1 ? ' hour' : ' hours'}`)
  if (remainingMinutes > 0)
    parts.push(
      `${remainingMinutes}${remainingMinutes === 1 ? ' minute' : ' minutes'}`
    )

  return parts.join(', ')
}

export default memo((node: CustomNode) => {
  const data = node.data as TimeNodeData
  const delay = formatTimeDelay(data.delay)
  const setLevel = useSetAtom(levelAtom)

  return (
    <TimeFormDialog onClick={() => setLevel(node.data.level)} node={node}>
      <BaseNode
        label="Time Delay"
        icon={<ClockIcon />}
        className="text-left"
        iconClassName="bg-primary/20 text-primary"
      >
        <div className="text-sm font-medium">{delay}</div>
      </BaseNode>
    </TimeFormDialog>
  )
})
