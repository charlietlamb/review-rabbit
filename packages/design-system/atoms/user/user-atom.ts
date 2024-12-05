import { User } from '@remio/database'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
