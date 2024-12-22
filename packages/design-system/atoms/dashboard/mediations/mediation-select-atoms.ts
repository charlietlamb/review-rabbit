import { atom } from 'jotai'
import { MediationWithData } from '@remio/database'

export const mediationsSelectAtom = atom<MediationWithData[]>([])
export const mediationsSelectSearchAtom = atom<string>('')
