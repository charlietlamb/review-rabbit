import { atom } from 'jotai'
import { CustomNode } from '@rabbit/design-system/components/flow/lib/types'
import { getCreateNodes } from '@rabbit/design-system/components/flow/lib/add-create-nodes'
import { Edge } from '@xyflow/react'
import { generateEdges } from '@rabbit/design-system/components/flow/lib/generate-edges'
export const nodesAtom = atom<CustomNode[]>([])

export const nodesWithAddsAtom = atom<CustomNode[]>((get) =>
  getCreateNodes(get(nodesAtom))
)

export const edgesAtom = atom<Edge[]>((get) =>
  generateEdges(get(nodesWithAddsAtom))
)
