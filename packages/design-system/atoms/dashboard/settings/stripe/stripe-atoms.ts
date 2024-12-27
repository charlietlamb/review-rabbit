'use client'

import { atom } from 'jotai'
import { StripeConnect } from '@burse/database/schema/stripe-connects'

export const stripeConnectAtom = atom<StripeConnect | undefined>(undefined)
