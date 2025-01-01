import { atom } from 'jotai'
import { Client } from '@rabbit/database/schema/clients'

export const clientAtom = atom<Client | null>(null)
