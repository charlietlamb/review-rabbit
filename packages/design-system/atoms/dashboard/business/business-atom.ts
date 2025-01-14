import { atom } from 'jotai'

export const businessSearchAtom = atom('')
export const businessesAtom = atom<any[]>([])
export const selectedBusinessAtom = atom<string | undefined>(undefined)
