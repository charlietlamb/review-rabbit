import { useAtomValue } from 'jotai'
import { stripeDetailsAtom } from '@rabbit/design-system/atoms/user/user-atom'

export function useStripeDetails() {
  return useAtomValue(stripeDetailsAtom)
}
