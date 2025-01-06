import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import { NODE_TYPES } from '../../lib/types'
import { useState } from 'react'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  levelAtom,
  nodesAtom,
  manageNodesAtom,
  isCreateModeAtom,
} from '@rabbit/design-system/atoms/flow/flow-atoms'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { calculateNodePosition } from '../../lib/add-create-nodes'
import TimeInputState from '@rabbit/design-system/components/form/time/time-input-state'
import { TimeValue } from 'react-aria-components'
import { CustomNode, TimeNodeData } from '../../lib/types'
import { Time } from '@internationalized/date'

interface ExtendedTimeValue {
  time: TimeValue | null
  days: number
}

const VERTICAL_SPACING = 200

export default function TimeForm({
  onSuccess,
  node,
}: {
  onSuccess?: () => void
  node?: CustomNode
}) {
  const data = node?.data as TimeNodeData | undefined
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const level = useAtomValue(levelAtom)
  const nodes = useAtomValue(nodesAtom)
  const setNodes = useSetAtom(nodesAtom)
  const setManageNodes = useSetAtom(manageNodesAtom)
  const isCreateMode = useAtomValue(isCreateModeAtom)
  const [time, setTime] = useState<ExtendedTimeValue | null>(
    data?.delay
      ? {
          time: new Time(
            Math.floor((data.delay % (24 * 60)) / 60),
            data.delay % 60
          ),
          days: Math.floor(data.delay / (24 * 60)),
        }
      : null
  )

  function validate() {
    if (!time) {
      setAttemptSubmitted(true)
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
    if (!validate()) {
      return
    }

    if (!time?.time && !time?.days) {
      toast.error('Please specify a time delay')
      return
    }

    const totalMinutes =
      (time?.days ?? 0) * 24 * 60 +
      (time?.time?.hour ?? 0) * 60 +
      (time?.time?.minute ?? 0)

    if (totalMinutes <= 0) {
      toast.error('Time delay must be greater than 0')
      return
    }

    if (node === undefined) {
      const position = calculatePosition()
      const newNode = {
        id: uuidv4(),
        type: NODE_TYPES.TIME,
        data: {
          label: 'Time Delay',
          level,
          type: NODE_TYPES.TIME,
          delay: totalMinutes,
          unit: 'minutes',
        },
        position,
      }

      if (isCreateMode) {
        setNodes((currentNodes) => [...currentNodes, newNode])
      } else {
        setManageNodes((currentNodes) => [...currentNodes, newNode])
      }
      toast.success('Successfully added time delay')
    } else {
      if (isCreateMode) {
        setNodes((currentNodes) =>
          currentNodes.map((oldNode) =>
            oldNode.id === node?.id
              ? { ...oldNode, data: { ...oldNode.data, delay: totalMinutes } }
              : oldNode
          )
        )
      } else {
        setManageNodes((currentNodes) =>
          currentNodes.map((oldNode) =>
            oldNode.id === node?.id
              ? { ...oldNode, data: { ...oldNode.data, delay: totalMinutes } }
              : oldNode
          )
        )
      }
    }
    onSuccess?.()
  }

  return (
    <FormProvider value={{ attemptSubmitted }}>
      <TimeInputState
        value={time}
        onChange={setTime}
        label="Time Delay"
        name="time"
        required
      />
      <Button variant="shine" className="w-full" onClick={handleSubmit}>
        Add Time Delay
      </Button>
    </FormProvider>
  )
}
