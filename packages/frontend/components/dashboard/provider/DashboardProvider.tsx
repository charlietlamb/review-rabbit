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
  user: UserWithProfilePic
  children: React.ReactNode
}) {
  const router = useRouter()
  const setError = useSetAtom(dashboardSettingsAccountError)
  const setUser = useSetAtom(userAtom)
  setUser(user)
  useEffect(() => {
    setUser(user)
    if (user?.name == undefined || user?.profilePicUrl == null) {
      setError('Please fill in all required fields')
      return router.push('/dashboard/settings/account')
    }
  }, [user])
  return <>{children}</>
}
