import { atom } from 'jotai'
import { ClientWithData } from '@rabbit/database/schema/app/clients'

export const clientsSelectAtom = atom<ClientWithData[]>([])
export const clientsSelectSearchAtom = atom<string>('')
