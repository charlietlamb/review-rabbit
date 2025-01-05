import { Client } from '@rabbit/database/schema/app/clients'
import { atom } from 'jotai'

export const selectedClientsAtom = atom<Client[]>([])
export const clientsSelectSearchAtom = atom<string>('')
export const clientsSelectOptionsAtom = atom<Client[]>([])
