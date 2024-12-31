'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@rabbit/design-system/lib/authClient'
import { getEnv } from '@rabbit/env'

export default function OneTapProvider({
  children,
}: {
  children: React.ReactNode
}) {
  if (getEnv().NEXT_PUBLIC_DOMAIN === 'localhost') return <>{children}</>
  const router = useRouter()
  const session = authClient.useSession()
  if (!session.data && !session.isPending) {
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
