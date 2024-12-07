'use client'

import { atom } from 'jotai'
import { StripeConnect } from '@remio/database/schema/stripe-connects'

export const stripeConnectAtom = atom<StripeConnect | undefined>(undefined)
