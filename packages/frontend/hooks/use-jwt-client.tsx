import { useAtomValue } from 'jotai'
import { jwtAtom } from '@/atoms/jwt/jwt-atom'

export default function useJwtClient() {
  const jwt = useAtomValue(jwtAtom)
  if (!jwt) throw new Error('JWT not found')
  return jwt
}
