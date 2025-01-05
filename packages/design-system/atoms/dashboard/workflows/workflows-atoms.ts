import { atom } from 'jotai'
import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'

export const workflowsSearchAtom = atom<string>('')
export const workflowsAtoms = atom<WorkflowWithItems[]>([])
