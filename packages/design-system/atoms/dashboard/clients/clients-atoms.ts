import { atom } from 'jotai'
import { Client } from '@remio/database/schema/clients'

export const clientsSearchAtom = atom<string>('')
export const clientsAtoms = atom<Client[]>([])
