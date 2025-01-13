import { CustomNode, NODE_TYPES } from './types'

/**
 * Checks if a node can be deleted and returns true if deletion is successful
 * Rules:
 * 1. Init node cannot be deleted
 * 2. Only nodes on the last level can be deleted
 */
export function canDeleteNode(node: CustomNode, nodes: CustomNode[]): boolean {
  // Cannot delete init node
  if (node.data.type === NODE_TYPES.INIT) {
    return false
  }

  // Get the maximum level from all nodes
  const maxLevel = Math.max(...nodes.map((n) => n.data.level))

  // Can only delete nodes on the last level
  if (node.data.level !== maxLevel) {
    return false
  }

  return true
}
