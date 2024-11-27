'use client'

import { Background, ReactFlow } from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import CreateNodeButton from './create/create-node-button'
import {
  SocialNode,
  SocialNodeType,
} from '@dubble/design-system/components/react-flow/social-node'
import { providerDataByName } from '@dubble/design-system/lib/providers'

const nodeTypes = {
  social: SocialNode,
}

const defaultNodes: SocialNodeType[] = [
  {
    id: '1',
    position: { x: 200, y: 200 },
    data: {
      platform: providerDataByName.YouTube,
    },
    type: 'social',
  },
]

const defaultEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
]

export default function Flow() {
  return (
    <div className="relative h-full w-full">
      <CreateNodeButton />
      <ReactFlow
        nodeTypes={nodeTypes}
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  )
}
