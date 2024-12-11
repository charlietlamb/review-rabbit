import { atom } from 'jotai'
import { InvoiceWithClient } from '@remio/database'

export const invoicesSearchAtom = atom<string>('')
export const invoicesAtoms = atom<InvoiceWithClient[]>([])
