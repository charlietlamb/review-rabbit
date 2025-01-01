import { atom } from 'jotai'
import { Business } from '@rabbit/database/schema/app/businesses'
import { atomWithLocalStorage } from '@rabbit/design-system/atoms/utility/atom-with-local-storage'

export const businessesAtom = atom<Business[]>([])
export const businessIdAtom = atomWithLocalStorage<string | null>(
  'businessId',
  null
)
