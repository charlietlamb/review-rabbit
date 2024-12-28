import { atom } from 'jotai'
import { StripeConnect } from '@burse/database/schema/stripe-connects'

export const stripeConnectsAtom = atom<StripeConnect[]>([])
export const stripeConnectsSearchAtom = atom<string>('')

export const stripeConnectAtom = atom<StripeConnect | null>(null)
