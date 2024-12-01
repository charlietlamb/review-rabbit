'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@ff/design-system/lib/authClient'

export default function OneTapProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
  const router = useRouter()
  const session = authClient.useSession()
  if (!session.data) {
    authClient.oneTap({
      fetchOptions: {
        onSuccess: () => {
          router.push('/dashboard')
        },
      },
    })
  }
  return <>{children}</>
}
