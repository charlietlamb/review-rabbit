import { atom } from 'jotai'
import { BusinessWithLocations } from '@rabbit/database/types/business-location-types'
import { atomWithLocalStorage } from '@rabbit/design-system/atoms/utility/atom-with-local-storage'

export const businessSearchAtom = atom('')
export const businessesAtom = atom<BusinessWithLocations[]>([])

export const selectedBusinessAtom =
  atomWithLocalStorage<BusinessWithLocations | null>('selected-business', null)
