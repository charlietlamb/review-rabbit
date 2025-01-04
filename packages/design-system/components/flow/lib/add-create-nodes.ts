import { CustomNode, NODE_TYPES } from './types'

const VERTICAL_SPACING = 200
const HORIZONTAL_SPACING = 500

function getCreateNodeType(level: number) {
  // Init is at level 1, so level 2 should be message, level 3 time, etc.
  return level % 2 === 0 ? NODE_TYPES.CREATE_MESSAGE : NODE_TYPES.CREATE_TIME
}

export function getCreateNodes(nodes: CustomNode[]): CustomNode[] {
  // Keep the init node
  const initNode = nodes.find((node) => node.data.type === NODE_TYPES.INIT)
  if (!initNode) return nodes

  // Group nodes by level
  const nodesByLevel = nodes.reduce(
    (acc, node) => {
      const level = node.data.level ?? 1 // Default to level 1 instead of 0
      if (!acc[level]) acc[level] = []
      acc[level].push(node)
      return acc
    },
    {} as Record<number, CustomNode[]>
  )

  const createNodes: CustomNode[] = []

  // Process each level
  Object.entries(nodesByLevel).forEach(([levelStr, levelNodes]) => {
    const level = parseInt(levelStr)
    // Skip level 1 (init) instead of 0
    if (level === 1) return

    const nodesInLevel = levelNodes.length

    // Check if this level has any message nodes
    const hasMessageNode = levelNodes.some(
      (node) => node.data.type === NODE_TYPES.MESSAGE
    )

    if (hasMessageNode) {
      // Calculate x position based on number of nodes in the level
      const baseOffset = (nodesInLevel * HORIZONTAL_SPACING) / 2
      const lastNodeX = -baseOffset + (nodesInLevel - 1) * HORIZONTAL_SPACING

      const createNodeType = getCreateNodeType(level)

      // Add one create node to the right of the last node
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
          x: lastNodeX + HORIZONTAL_SPACING,
          y: (level - 1) * VERTICAL_SPACING,
        },
      })
    }
  })

  // Add one create node for the next level
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

  return [...nodes, ...createNodes]
}
