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

  // For each level (except the last), connect all nodes to all nodes in the next level
  for (let i = 0; i < levels.length - 1; i++) {
    const currentLevel = levels[i]
    const nextLevel = levels[i + 1]

    // Connect each node in current level to each node in next level
    nodesByLevel[currentLevel].forEach((sourceNode) => {
      nodesByLevel[nextLevel].forEach((targetNode) => {
        edges.push({
          id: `${sourceNode.id}-${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
        })
      })
    })
  }

  return edges
}
