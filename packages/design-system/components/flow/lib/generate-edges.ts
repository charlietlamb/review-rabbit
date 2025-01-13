import { CustomNode } from './types'
import { Edge } from '@xyflow/react'

export function generateEdges(nodes: CustomNode[]): Edge[] {
  const edges: Edge[] = []

  // Sort nodes by level
  const sortedNodes = [...nodes].sort((a, b) => a.data.level - b.data.level)

  // Group nodes by level
  const nodesByLevel = sortedNodes.reduce(
    (acc, node) => {
      const level = node.data.level
      if (!acc[level]) acc[level] = []
      acc[level].push(node)
      return acc
    },
    {} as Record<number, CustomNode[]>
  )

  // Get all levels
  const levels = Object.keys(nodesByLevel)
    .map(Number)
    .sort((a, b) => a - b)

  // For each level (except the last), connect nodes to the next level
  for (let i = 0; i < levels.length - 1; i++) {
    const currentLevel = levels[i]
    const nextLevel = levels[i + 1]
    const currentNodes = nodesByLevel[currentLevel]
    const nextNodes = nodesByLevel[nextLevel]

    // If there's only one node in the current level, connect it to all nodes in the next level
    if (currentNodes.length === 1) {
      const sourceNode = currentNodes[0]
      nextNodes.forEach((targetNode) => {
        edges.push({
          id: `${sourceNode.id}-${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
        })
      })
      continue
    }

    // If there's only one node in the next level, connect all current nodes to it
    if (nextNodes.length === 1) {
      const targetNode = nextNodes[0]
      currentNodes.forEach((sourceNode) => {
        edges.push({
          id: `${sourceNode.id}-${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
        })
      })
      continue
    }

    // Otherwise, connect nodes one-to-one where possible
    const maxConnections = Math.max(currentNodes.length, nextNodes.length)
    for (let j = 0; j < maxConnections; j++) {
      const sourceNode = currentNodes[j % currentNodes.length]
      const targetNode = nextNodes[j % nextNodes.length]
      edges.push({
        id: `${sourceNode.id}-${targetNode.id}`,
        source: sourceNode.id,
        target: targetNode.id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
      })
    }
  }

  return edges
}
