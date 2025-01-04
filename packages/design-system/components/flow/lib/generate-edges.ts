import { CustomNode } from './types'
import { Edge } from '@xyflow/react'

export function generateEdges(nodes: CustomNode[]): Edge[] {
  const sortedNodes = nodes.sort((a, b) => a.data.level - b.data.level)
  const edges: Edge[] = []

  // Group nodes by level
  const nodesByLevel = sortedNodes.reduce(
    (acc, node) => {
      const level = node.data.level
      if (!acc[level]) {
        acc[level] = []
      }
      acc[level].push(node)
      return acc
    },
    {} as Record<number, CustomNode[]>
  )

  // Get all levels and sort them
  const levels = Object.keys(nodesByLevel)
    .map(Number)
    .sort((a, b) => a - b)

  // Create edges between adjacent levels
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
        })
      })
    })
  }

  return edges
}
