'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { dashboardSettingsAccountError } from '@/atoms/dashboard/settings/account/DashboardSettingsAccountAtoms'
import { useSetAtom } from 'jotai'
import { userAtom } from '@/atoms/user/userAtom'

export default function DashboardProvider({
  user,
  children,
}: {
  user: User | null
  children: React.ReactNode
}) {
  const router = useRouter()
  const setError = useSetAtom(dashboardSettingsAccountError)
  const setUser = useSetAtom(userAtom)
  useEffect(() => {
    if (user?.name == undefined || user?.image == undefined) {
      router.push('/dashboard/settings/account')
      setError('Please fill in all required fields')
    }
    if (user) {
      setUser(user)
    }
  }, [user])
  return <>{children}</>
}
