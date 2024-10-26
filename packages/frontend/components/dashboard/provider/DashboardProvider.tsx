'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { dashboardSettingsAccountError } from '@/atoms/dashboard/settings/account/DashboardSettingsAccountAtoms'
import { useSetAtom } from 'jotai'

export default function DashboardProvider({
  user,
  children,
}: {
  user: User | null
  children: React.ReactNode
}) {
  const router = useRouter()
  const setError = useSetAtom(dashboardSettingsAccountError)
  useEffect(() => {
    if (user?.name == undefined || user?.image == undefined) {
      router.push('/dashboard/settings/account')
      setError('Please fill in all required fields')
    }
  }, [user])
  return <>{children}</>
}
