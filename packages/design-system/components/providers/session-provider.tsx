'use client'

import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import {
  userAtom,
  accountAtom,
} from '@rabbit/design-system/atoms/user/user-atom'
import { useRouter } from 'next/navigation'
import { User, Account } from '@rabbit/database'

export default function SessionProvider({
  user,
  account,
  children,
}: {
  user: User | null
  account: Account | null
  children: React.ReactNode
}) {
  const router = useRouter()
  const setUser = useSetAtom(userAtom)
  const setAccount = useSetAtom(accountAtom)
  useEffect(() => {
    setUser(user)
    setAccount(account)
    if (!user) {
      router.push('/login')
    }
  }, [user, account, router, setUser])

  return <>{children}</>
}
