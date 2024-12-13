import { atom } from 'jotai'
import { Client } from '@remio/database/schema/clients'

export const clientAtom = atom<Client | null>(null)
