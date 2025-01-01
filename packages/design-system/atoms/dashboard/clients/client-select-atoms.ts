import { atom } from 'jotai'
import { Client } from '@rabbit/database/schema/clients'

export const clientsSelectAtom = atom<Client[]>([])
export const clientsSelectSearchAtom = atom<string>('')
