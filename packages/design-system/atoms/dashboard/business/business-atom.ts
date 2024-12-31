import { atom } from 'jotai'
import { Business } from '@rabbit/database/schema/app/businesses'

export const businessesAtom = atom<Business[]>([])
