import { User } from '@burse/database'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
