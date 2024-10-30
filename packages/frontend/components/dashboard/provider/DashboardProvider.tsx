'use client'

import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { userAtom } from '@/atoms/user/userAtom'

export default function DashboardProvider({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  const setUser = useSetAtom(userAtom)
  setUser(user)
  useEffect(() => {
    setUser(user)
  }, [user])
  return <>{children}</>
}
