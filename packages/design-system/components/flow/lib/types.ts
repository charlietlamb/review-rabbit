import { Node } from '@xyflow/react'

export const NODE_TYPES = {
  INIT: 'init',
  CREATE_MESSAGE: 'create-message',
  CREATE_TIME: 'create-time',
  MESSAGE: 'message',
  TIME: 'time',
} as const

export type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES]

export const MESSAGE_TYPES = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
} as const

export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES]

type BaseNodeData = {
  type: NodeType
  label: string
  level: number
}

export type InitNodeData = BaseNodeData & {
  type: typeof NODE_TYPES.INIT
}

export type CreateMessageNodeData = BaseNodeData & {
  type: typeof NODE_TYPES.CREATE_MESSAGE
}

export type CreateTimeNodeData = BaseNodeData & {
  type: typeof NODE_TYPES.CREATE_TIME
}

export type MessageNodeData = BaseNodeData & {
  type: typeof NODE_TYPES.MESSAGE
  content: string
  messageType: MessageType
}

export type TimeNodeData = BaseNodeData & {
  type: typeof NODE_TYPES.TIME
  delay: number
}

type NodeData =
  | InitNodeData
  | CreateMessageNodeData
  | CreateTimeNodeData
  | MessageNodeData
  | TimeNodeData

export type CustomNode = Node<NodeData> & {
  id: string
}
