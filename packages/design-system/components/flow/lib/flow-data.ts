import { CustomNode, NODE_TYPES } from './types'
import InitNode from '../nodes/init-node'
import CreateMessageNode from '../nodes/create-message-node'
import CreateTimeNode from '../nodes/create-time-node'
import MessageNode from '../nodes/message-node'
import TimeNode from '../nodes/time-node'

export const nodeTypes = {
  [NODE_TYPES.INIT]: InitNode,
  [NODE_TYPES.CREATE_MESSAGE]: CreateMessageNode,
  [NODE_TYPES.CREATE_TIME]: CreateTimeNode,
  [NODE_TYPES.MESSAGE]: MessageNode,
  [NODE_TYPES.TIME]: TimeNode,
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
