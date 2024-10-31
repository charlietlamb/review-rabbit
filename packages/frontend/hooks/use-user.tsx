import { useAtomValue } from 'jotai'
import { userAtom } from '@/atoms/user/userAtom'

export default function useUser() {
  const user = useAtomValue(userAtom)
  if (!user) throw new Error('User not found')
  return user as User
}
