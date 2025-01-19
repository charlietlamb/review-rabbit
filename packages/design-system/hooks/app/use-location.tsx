import { useAtomValue } from 'jotai'
import { selectedLocationAtom } from '@rabbit/design-system/atoms/dashboard/location/location-atoms'

export function useLocation() {
  const location = useAtomValue(selectedLocationAtom)
  return location
}
