import { User } from '@rabbit/database'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
