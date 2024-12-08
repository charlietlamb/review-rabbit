import { useAtomValue } from 'jotai'
import { userAtom } from '@remio/design-system/atoms/user/user-atom'
import { User } from '@remio/database'

export default function useUser() {
  const user = useAtomValue(userAtom)
  return user as User | null
}
