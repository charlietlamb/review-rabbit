import { atom } from 'jotai'
import { WorkflowWithItems } from '@rabbit/database/schema/app/workflows'

export const workflowsSearchAtom = atom<string>('')
export const workflowsAtoms = atom<WorkflowWithItems[]>([])
