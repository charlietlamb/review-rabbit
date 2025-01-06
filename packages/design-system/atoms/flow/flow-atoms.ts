import { atom } from 'jotai'
import { CustomNode } from '@rabbit/design-system/components/flow/lib/types'
import { getCreateNodes } from '@rabbit/design-system/components/flow/lib/add-create-nodes'
import { Edge } from '@xyflow/react'
import { generateEdges } from '@rabbit/design-system/components/flow/lib/generate-edges'
import { atomWithLocalStorage } from '@rabbit/design-system/atoms/utility/atom-with-local-storage'

export const nodesAtom = atomWithLocalStorage<CustomNode[]>('nodes', [])
export const nodesWithAddsAtom = atom<CustomNode[]>((get) =>
  getCreateNodes(get(nodesAtom))
)

export const manageNodesAtom = atom<CustomNode[]>([])
export const manageNodesWithAddsAtom = atom<CustomNode[]>((get) =>
  getCreateNodes(get(manageNodesAtom))
)

export const isCreateModeAtom = atom<boolean>(true)

export const levelAtom = atom<number>(0)

export const edgesAtom = atom<Edge[]>((get) =>
  generateEdges(get(nodesWithAddsAtom))
)
export const manageEdgesAtom = atom<Edge[]>((get) =>
  generateEdges(get(manageNodesWithAddsAtom))
)
