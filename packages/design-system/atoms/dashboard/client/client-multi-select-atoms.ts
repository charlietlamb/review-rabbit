import { ClientWithData } from '@rabbit/database/schema/app/clients'
import { atom } from 'jotai'

export const selectedClientsAtom = atom<ClientWithData[]>([])
export const clientsSelectSearchAtom = atom<string>('')
export const clientsSelectOptionsAtom = atom<ClientWithData[]>([])
