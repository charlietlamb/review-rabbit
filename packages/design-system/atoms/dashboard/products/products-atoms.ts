import { atom } from 'jotai'
import { StripeProductWithData } from '@burse/database/schema/stripe/stripe-products'

export const stripeProductsAtom = atom<StripeProductWithData[]>([])
export const stripeProductsSearchAtom = atom<string>('')
