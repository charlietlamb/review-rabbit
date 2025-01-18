import { atom } from 'jotai'
import { ClientWithReviewMatches } from '@rabbit/database/schema/app/clients'

export const clientsSelectAtom = atom<ClientWithReviewMatches[]>([])
export const clientsSelectSearchAtom = atom<string>('')
