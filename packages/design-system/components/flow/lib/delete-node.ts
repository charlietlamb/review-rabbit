import { CustomNode, NODE_TYPES } from './types'

/**
 * Deletes a node and updates the levels of all nodes after the deleted node.
 * Rules:
 * 1. Init node cannot be deleted
 * 2. Only nodes on the last level can be deleted
 * 3. After deletion, create nodes are updated to maintain proper level sequence
 */
export default function deleteNode(
  node: CustomNode,
  nodes: CustomNode[],
  setNodes: (nodes: CustomNode[]) => void
): void {
  // Cannot delete init node
  if (node.data.type === NODE_TYPES.INIT) {
    return
  }

  // Get the maximum level from all non-create nodes
  const maxLevel = Math.max(
    ...nodes
      .filter((n) => !n.data.type.startsWith('create-'))
      .map((n) => n.data.level)
  )

  // Can only delete nodes on the last level
  if (node.data.level !== maxLevel) {
    return
  }

  // Get all nodes at the current level
  const nodesAtLevel = nodes.filter(
    (n) =>
      n.data.level === node.data.level && !n.data.type.startsWith('create-')
  )

  // If this is the last node at this level, we need to update create nodes
  const shouldUpdateCreateNodes = nodesAtLevel.length === 1

  // Remove the node
  const filteredNodes = nodes.filter((n) => n.id !== node.id)

  if (shouldUpdateCreateNodes) {
    // Update create nodes levels
    const updatedNodes = filteredNodes.map((n) => {
      if (n.data.type.startsWith('create-') && n.data.level > node.data.level) {
        return {
          ...n,
          data: {
            ...n.data,
            level: n.data.level - 1,
          },
          position: {
            ...n.position,
            y: (n.data.level - 2) * 200, // 200 is the vertical spacing
          },
        }
      }
      return n
    })
    setNodes(updatedNodes)
  } else {
    setNodes(filteredNodes)
  }
}
