import { User, Account } from '@rabbit/database'

import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
export const accountAtom = atom<Account | null>(null)
