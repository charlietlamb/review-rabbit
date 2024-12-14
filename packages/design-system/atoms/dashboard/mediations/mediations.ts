import { Client } from '@remio/database/schema'
import { atom } from 'jotai'

export const selectedClientsAtom = atom<Client[]>([])
export const clientsSelectSearchAtom = atom<string>('')
export const clientsSelectOptionsAtom = atom<Client[]>([])
