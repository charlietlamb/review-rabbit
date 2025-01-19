import { useAtomValue } from 'jotai'
import { selectedBusinessAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atoms'
import { BusinessWithLocations } from '@rabbit/database/types/business-location-types'

export function useBusiness() {
  const business = useAtomValue(selectedBusinessAtom)
  if (!business) {
    throw new Error('No business selected')
  }
  return business as BusinessWithLocations
}
