import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
import { CustomNode, NODE_TYPES, MessageType } from './types'

export const getNodes = (workflow: WorkflowWithItems): CustomNode[] => {
  return workflow.items.map((item) => {
    switch (item.type) {
      case NODE_TYPES.MESSAGE:
        return {
          id: item.id,
          type: item.type,
          data: {
            type: NODE_TYPES.MESSAGE,
            label: item.content,
            level: item.level,
            content: item.content,
            messageType: 'email' as MessageType,
          },
          position: { x: item.x, y: item.y },
        }
      case NODE_TYPES.TIME:
        return {
          id: item.id,
          type: item.type,
          data: {
            type: NODE_TYPES.TIME,
            label: `Wait ${item.time} minutes`,
            level: item.level,
            delay: item.time,
          },
          position: { x: item.x, y: item.y },
        }
      case NODE_TYPES.CREATE_MESSAGE:
        return {
          id: item.id,
          type: item.type,
          data: {
            type: NODE_TYPES.CREATE_MESSAGE,
            label: 'Create Message',
            level: item.level,
          },
          position: { x: item.x, y: item.y },
        }
      case NODE_TYPES.CREATE_TIME:
        return {
          id: item.id,
          type: item.type,
          data: {
            type: NODE_TYPES.CREATE_TIME,
            label: 'Create Time',
            level: item.level,
          },
          position: { x: item.x, y: item.y },
        }
      default:
        return {
          id: item.id,
          type: item.type,
          data: {
            type: NODE_TYPES.INIT,
            label: 'Start',
            level: item.level,
          },
          position: { x: item.x, y: item.y },
        }
    }
  })
}
