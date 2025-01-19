import { atomWithLocalStorage } from '@rabbit/design-system/atoms/utility/atom-with-local-storage'
import { LocationWithBusiness } from '@rabbit/database/types/business-location-types'

export const selectedLocationAtom =
  atomWithLocalStorage<LocationWithBusiness | null>('selected-location', null)
