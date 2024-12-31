import { useAtomValue } from 'jotai'
import { userAtom } from '@rabbit/design-system/atoms/user/user-atom'
import { User } from '@rabbit/database'

export default function useUser() {
  const user = useAtomValue(userAtom)
  return user as User | null
}
