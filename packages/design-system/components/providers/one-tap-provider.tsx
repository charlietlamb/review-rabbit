'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@remio/design-system/lib/authClient'
import { env } from '@remio/env'

export default function OneTapProvider({
  children,
}: {
  children: React.ReactNode
}) {
  if (env.NEXT_PUBLIC_DOMAIN === 'localhost') return <>{children}</>
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
