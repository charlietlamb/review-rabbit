import { User, Account } from '@rabbit/database'
import { Subscription } from '@rabbit/stripe/lib/subscription'

import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
export const accountAtom = atom<Account | null>(null)
export const stripeDetailsAtom = atom<Subscription | null>(null)
