import { CustomNode, NODE_TYPES } from './types'
import InitNode from '../nodes/init-node'
import CreateMessageNode from '../nodes/create-message-node'
import CreateTimeNode from '../nodes/create-time-node'

export const nodeTypes = {
  [NODE_TYPES.INIT]: InitNode,
  [NODE_TYPES.CREATE_MESSAGE]: CreateMessageNode,
  [NODE_TYPES.CREATE_TIME]: CreateTimeNode,
}

export const initialNodes = [
  {
    id: '1',
    type: NODE_TYPES.INIT,
    data: {
      label: 'Init',
      type: NODE_TYPES.INIT,
      level: 1,
    },
    position: { x: 0, y: 0 },
  },
] as CustomNode[]

export const initialEdges = []
