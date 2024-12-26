import { atom } from 'jotai'
import { MediationWithData } from '@remio/database'

export const mediationsAtoms = atom<MediationWithData[]>([])
export const mediationsSearchAtom = atom<string>('')
