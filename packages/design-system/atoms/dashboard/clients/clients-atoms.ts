import { atom } from 'jotai'
import { Client } from '@remio/database/schema/clients'
export const clientsAtoms = atom<Client[]>([])
