import { useAtomValue } from 'jotai'
import { userAtom } from '@/atoms/user/user-atom'

export default function useUser() {
  const user = useAtomValue(userAtom)
  return user as User | null
}
