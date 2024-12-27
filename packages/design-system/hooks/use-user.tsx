import { useAtomValue } from 'jotai'
import { userAtom } from '@burse/design-system/atoms/user/user-atom'
import { User } from '@burse/database'

export default function useUser() {
  const user = useAtomValue(userAtom)
  return user as User | null
}
