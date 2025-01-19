import { useAtomValue } from 'jotai'
import { selectedBusinessAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atoms'

export function useBusiness() {
  const business = useAtomValue(selectedBusinessAtom)
  return business
}
