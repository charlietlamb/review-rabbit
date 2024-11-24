import { User } from '@dubble/database'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
