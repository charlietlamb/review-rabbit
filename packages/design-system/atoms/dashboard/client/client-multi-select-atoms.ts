import { ClientWithReviewMatches } from '@rabbit/database/schema/app/clients'
import { atom } from 'jotai'

export const selectedClientsAtom = atom<ClientWithReviewMatches[]>([])
export const clientsSelectSearchAtom = atom<string>('')
export const clientsSelectOptionsAtom = atom<ClientWithReviewMatches[]>([])
