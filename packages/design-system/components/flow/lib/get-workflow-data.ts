import { CustomNode, NODE_TYPES, MessageNodeData, TimeNodeData } from './types'
import { WorkflowForm } from '@rabbit/database/types/workflow-types'

export default function getWorkflowData(
  nodes: CustomNode[]
): Pick<WorkflowForm, 'items'> {
  // First, sort nodes by level
  const sortedNodes = [...nodes].sort((a, b) => a.data.level - b.data.level)

  // Calculate cumulative time for each level
  const timeByLevel = new Map<number, number>()
  let currentTime = 0

  sortedNodes.forEach((node) => {
    if (node.data.type === NODE_TYPES.TIME) {
      const timeData = node.data as TimeNodeData
      currentTime += timeData.delay
      timeByLevel.set(
        node.data.level,
        (timeByLevel.get(node.data.level) || 0) + timeData.delay
      )
    }
  })

  // Calculate cumulative time up to each level
  const cumulativeTimeUpToLevel = new Map<number, number>()
  let runningTotal = 0
  Array.from(timeByLevel.entries())
    .sort(([levelA], [levelB]) => levelA - levelB)
    .forEach(([level, time]) => {
      runningTotal += time
      cumulativeTimeUpToLevel.set(level, runningTotal)
    })

  return {
    items: sortedNodes
      .filter(
        (node) =>
          node.data.type === NODE_TYPES.MESSAGE ||
          node.data.type === NODE_TYPES.TIME
      )
      .map((node) => {
        if (node.data.type === NODE_TYPES.MESSAGE) {
          const messageData = node.data as MessageNodeData
          // Calculate total time from all previous levels
          const timeFromPreviousLevels = Array.from(
            cumulativeTimeUpToLevel.entries()
          )
            .filter(([level]) => level < node.data.level)
            .reduce((acc, [_, time]) => acc + time, 0)

          return {
            id: node.id,
            type: node.data.type,
            method: node.data.messageType,
            x: node.position.x,
            y: node.position.y,
            subject: messageData.subject,
            content: messageData.content,
            time: timeFromPreviousLevels,
            level: node.data.level,
          }
        } else {
          const timeData = node.data as TimeNodeData
          return {
            id: node.id,
            type: node.data.type,
            method: 'time',
            x: node.position.x,
            y: node.position.y,
            content: '',
            subject: '',
            time: timeData.delay,
            level: node.data.level,
          }
        }
      }),
  }
}
