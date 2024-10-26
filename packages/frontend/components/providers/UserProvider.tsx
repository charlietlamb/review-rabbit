'use client'

import { userAtom } from '@/atoms/user/userAtom'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

export default function UserProvider({
  user,
  children,
}: {
  user: User | null
  children: React.ReactNode
}) {
  const setUser = useSetAtom(userAtom)
  useEffect(() => {
    async function getUser() {
      setUser(user)
    }
    getUser()
  }, [user])
  return <>{children}</>
}
