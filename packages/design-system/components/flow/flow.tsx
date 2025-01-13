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
  manageNodesAtom,
  manageNodesWithAddsAtom,
  manageEdgesAtom,
  isCreateModeAtom,
  isDemoAtom,
} from '@rabbit/design-system/atoms/flow/flow-atoms'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
import { getNodes } from './lib/get-nodes'
import ResetFlow from './reset-flow'
import { usePathname } from 'next/navigation'

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: false,
  type: 'straight',
  style: { strokeWidth: 2 },
}

export default function Flow({ workflow }: { workflow?: WorkflowWithItems }) {
  const setNodes = useSetAtom(nodesAtom)
  const setManageNodes = useSetAtom(manageNodesAtom)
  const nodesWithAdds = useAtomValue(nodesWithAddsAtom)
  const manageNodesWithAdds = useAtomValue(manageNodesWithAddsAtom)
  const edges = useAtomValue(edgesAtom)
  const manageEdges = useAtomValue(manageEdgesAtom)
  const [isDemo, setIsDemo] = useAtom(isDemoAtom)
  const setIsCreateMode = useSetAtom(isCreateModeAtom)
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    if (workflow) {
      setManageNodes([...initialNodes, ...getNodes(workflow)])
    } else {
      if (!nodesWithAdds.length) {
        setNodes(initialNodes)
      }
    }
    setIsCreateMode(workflow ? false : true)
  }, [workflow])

  useEffect(() => {
    if (!pathname.includes('dashboard')) {
      setIsDemo(true)
    } else {
      setIsDemo(false)
    }
  }, [pathname])

  useEffect(() => {
    console.log(manageNodesWithAdds)
  }, [manageNodesWithAdds])

  return (
    <ReactFlow
      nodes={workflow ? manageNodesWithAdds : nodesWithAdds}
      edges={workflow ? manageEdges : edges}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      nodesDraggable={false}
      nodesConnectable={false}
      draggable={false}
      className="flex-grow"
      fitView
      fitViewOptions={{
        padding: isDemo ? 0.1 : 0.5,
      }}
      snapToGrid
      snapGrid={[20, 20]}
    >
      <ResetFlow />
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
