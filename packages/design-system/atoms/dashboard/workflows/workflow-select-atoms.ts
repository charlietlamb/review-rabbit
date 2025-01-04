import { atom } from 'jotai'
import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'

export const workflowsSelectAtom = atom<WorkflowWithItems[]>([])
export const workflowsSelectSearchAtom = atom<string>('')
