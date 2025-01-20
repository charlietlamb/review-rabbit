'use client'

import { useRouter } from 'next/navigation'
import { env } from '@rabbit/env'
import { getAuthClient } from '@rabbit/design-system/lib/auth-client'

export default function OneTapProvider({
  children,
}: {
  children: React.ReactNode
}) {
  if (env.NEXT_PUBLIC_DOMAIN === 'localhost') return <>{children}</>
  const authClient = getAuthClient(env)
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
