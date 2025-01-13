import { CustomNode, NODE_TYPES } from './types'

const VERTICAL_SPACING = 200
const HORIZONTAL_SPACING = 500

function getCreateNodeType(level: number) {
  return level % 2 === 0 ? NODE_TYPES.CREATE_MESSAGE : NODE_TYPES.CREATE_TIME
}

export function calculateNodePosition(nodesInLevel: number, nodeIndex: number) {
  const totalWidth = (nodesInLevel - 1) * HORIZONTAL_SPACING
  const startX = -totalWidth / 2
  return startX + nodeIndex * HORIZONTAL_SPACING
}

export function getCreateNodes(nodes: CustomNode[]): CustomNode[] {
  console.log(nodes)
  const initNode = nodes.find((node) => node.data.type === NODE_TYPES.INIT)
  if (!initNode) return nodes

  const nodesByLevel: Record<
    number,
    { content: CustomNode[]; creates: CustomNode[] }
  > = {}

  nodes.forEach((node) => {
    const level = node.data.level ?? 1
    if (!nodesByLevel[level]) {
      nodesByLevel[level] = { content: [], creates: [] }
    }
    if (
      node.data.type === NODE_TYPES.MESSAGE ||
      node.data.type === NODE_TYPES.TIME
    ) {
      nodesByLevel[level].content.push(node)
    } else if (node.data.type.startsWith('create-')) {
      nodesByLevel[level].creates.push(node)
    }
  })

  const createNodes: CustomNode[] = []
  const updatedNodes: CustomNode[] = []

  Object.entries(nodesByLevel).forEach(([levelStr, { content, creates }]) => {
    const level = parseInt(levelStr)
    if (level === 1) {
      updatedNodes.push(...nodes.filter((n) => n.data.level === 1))
      return
    }

    // Check if this level contains any time nodes
    const hasTimeNode = content.some(
      (node) => node.data.type === NODE_TYPES.TIME
    )
    const shouldShowCreateNode = !hasTimeNode && content.length > 0
    const totalNodesInLevel = content.length + (shouldShowCreateNode ? 1 : 0)

    content.forEach((node, index) => {
      updatedNodes.push({
        ...node,
        position: {
          x: calculateNodePosition(totalNodesInLevel, index),
          y: (level - 1) * VERTICAL_SPACING,
        },
      })
    })

    if (shouldShowCreateNode) {
      const createNodeType = getCreateNodeType(level)
      createNodes.push({
        id: `create-${level}`,
        type: createNodeType,
        data: {
          label:
            createNodeType === NODE_TYPES.CREATE_MESSAGE
              ? 'Create Message'
              : 'Create Time',
          type: createNodeType,
          level,
        },
        position: {
          x: calculateNodePosition(totalNodesInLevel, content.length),
          y: (level - 1) * VERTICAL_SPACING,
        },
      })
    }
  })

  const maxCurrentLevel = Math.max(...Object.keys(nodesByLevel).map(Number))
  const nextLevel = maxCurrentLevel + 1
  const createNodeType = getCreateNodeType(nextLevel)

  createNodes.push({
    id: `create-${nextLevel}`,
    type: createNodeType,
    data: {
      label:
        createNodeType === NODE_TYPES.CREATE_MESSAGE
          ? 'Create Message'
          : 'Create Time',
      type: createNodeType,
      level: nextLevel,
    },
    position: {
      x: 0,
      y: (nextLevel - 1) * VERTICAL_SPACING,
    },
  })

  return [...updatedNodes, ...createNodes]
}
