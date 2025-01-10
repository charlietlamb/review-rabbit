import { atom } from 'jotai'
import { AutomationWithItems } from '@rabbit/database/types/automation-types'

export const automationsAtom = atom<AutomationWithItems[]>([])
export const automationsSelectedAtoms = atom<AutomationWithItems[]>([])
export const automationsSearchAtom = atom<string>('')
