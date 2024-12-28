import { atom } from 'jotai'
import { StripeConnect } from '@burse/database/schema/stripe-connects'
import { atomWithLocalStorage } from '@burse/design-system/atoms/utility/atom-with-local-storage'

export const stripeConnectsAtom = atom<StripeConnect[]>([])
export const stripeConnectsSearchAtom = atom<string>('')

export const stripeConnectIdAtom = atomWithLocalStorage<string | null>(
  'stripeConnect',
  null
)
