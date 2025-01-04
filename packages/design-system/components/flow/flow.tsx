import {
  Background,
  ReactFlow,
  BackgroundVariant,
  DefaultEdgeOptions,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { initialNodes, nodeTypes } from './lib/flow-data'
import { useTheme } from 'next-themes'
import {
  nodesWithAddsAtom,
  edgesAtom,
  nodesAtom,
} from '@rabbit/design-system/atoms/flow/flow-atoms'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: false,
  type: 'straight',
  style: { strokeWidth: 2 },
}

export default function Flow() {
  const setNodes = useSetAtom(nodesAtom)
  const nodesWithAdds = useAtomValue(nodesWithAddsAtom)
  const edges = useAtomValue(edgesAtom)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setNodes(initialNodes)
  }, [])

  useEffect(() => {
    console.log(nodesWithAdds)
  }, [nodesWithAdds])

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
      fitViewOptions={{
        padding: 1,
      }}
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
