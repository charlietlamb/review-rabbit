'use client'

import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { userAtom } from '@/atoms/user/user-atom'
import { useRouter } from 'next/navigation'

export default function SessionProvider({
  user,
  children,
}: {
  user: User | null
  children: React.ReactNode
}) {
  const router = useRouter()
  const setUser = useSetAtom(userAtom)

  useEffect(() => {
    setUser(user)
    if (!user) {
      router.push('/login')
    }
  }, [user])

  return <>{children}</>
}
