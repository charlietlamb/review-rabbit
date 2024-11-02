'use client'

import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { userAtom } from '@/atoms/user/userAtom'
import { JWTPayload, JWTVerifyResult } from 'jose'
import { jwtAtom } from '@/atoms/jwt/jwtAtom'

export default function SessionProvider({
  user,
  jwt,
  children,
}: {
  user: User | null
  jwt: string | null
  children: React.ReactNode
}) {
  if (!user || !jwt) return null
  const setUser = useSetAtom(userAtom)
  const setJwt = useSetAtom(jwtAtom)

  setUser(user)
  setJwt(jwt)

  useEffect(() => {
    setUser(user)
  }, [user])
  useEffect(() => {
    setJwt(jwt)
  }, [jwt])

  return <>{children}</>
}
