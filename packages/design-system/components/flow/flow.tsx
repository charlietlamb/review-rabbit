import {
  Background,
  ReactFlow,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
  DefaultEdgeOptions,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { initialNodes, nodeTypes } from './lib/flow-data'
import { useCallback, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { generateEdges } from './lib/generate-edges'
import { CustomNode } from './lib/types'
import {
  nodesAtom,
  nodesWithAddsAtom,
  edgesAtom,
} from '@rabbit/design-system/atoms/flow/flow-atoms'
import { useAtom, useAtomValue } from 'jotai'

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: false,
  type: 'straight',
  style: { strokeWidth: 2 },
}

export default function Flow() {
  const [nodes, setNodes] = useAtom(nodesAtom)
  const nodesWithAdds = useAtomValue(nodesWithAddsAtom)
  const edges = useAtomValue(edgesAtom)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setNodes(initialNodes)
  }, [nodesWithAdds, setNodes])

  return (
    <ReactFlow
      nodes={nodesWithAdds}
      edges={edges}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      nodesDraggable={false}
      nodesConnectable={false}
      draggable={false}
      className="flex-grow"
      fitView
      snapToGrid
      snapGrid={[20, 20]}
    >
      <Background
        color={
          resolvedTheme === 'dark'
            ? 'hsl(var(--muted-foreground))'
            : 'hsl(var(--foreground))'
        }
        variant={BackgroundVariant.Dots}
      />
    </ReactFlow>
  )
}
