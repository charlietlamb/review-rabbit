'use client'

import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import {
  userAtom,
  accountAtom,
  stripeDetailsAtom,
} from '@rabbit/design-system/atoms/user/user-atom'
import { useRouter } from 'next/navigation'
import { User, Account } from '@rabbit/database'
import { Subscription } from '@rabbit/stripe/lib/subscription'

export default function SessionProvider({
  user,
  account,
  stripeDetails,
  children,
}: {
  user: User | null
  account: Account | null
  stripeDetails: Subscription | null
  children: React.ReactNode
}) {
  const router = useRouter()
  const setUser = useSetAtom(userAtom)
  const setAccount = useSetAtom(accountAtom)
  const setStripeDetails = useSetAtom(stripeDetailsAtom)
  useEffect(() => {
    setUser(user)
    setAccount(account)
    setStripeDetails(stripeDetails)
    if (!user) {
      router.push('/login')
    }
  }, [user, account, router, setUser, setAccount, setStripeDetails])

  return <>{children}</>
}
