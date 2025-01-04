import { CustomNode, NODE_TYPES, MessageNodeData, TimeNodeData } from './types'
import { WorkflowForm } from '@rabbit/database/types/workflow-types'

export default function getWorkflowData(
  nodes: CustomNode[]
): Pick<WorkflowForm, 'items'> {
  return {
    items: nodes
      .filter(
        (node) =>
          node.data.type === NODE_TYPES.MESSAGE ||
          node.data.type === NODE_TYPES.TIME
      )
      .map((node) => {
        if (node.data.type === NODE_TYPES.MESSAGE) {
          const messageData = node.data as MessageNodeData
          return {
            id: node.id,
            type: node.data.type,
            x: node.position.x,
            y: node.position.y,
            content: messageData.content,
            time: 0,
            level: node.data.level,
          }
        } else {
          const timeData = node.data as TimeNodeData
          return {
            id: node.id,
            type: node.data.type,
            x: node.position.x,
            y: node.position.y,
            content: '',
            time: timeData.delay,
            level: node.data.level,
          }
        }
      }),
  }
}
