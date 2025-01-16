import { Success } from '@rabbit/design-system/components/site/success/success'
import { syncStripeDataToKV } from '@rabbit/stripe/lib/sync-stripe-data-to-kv'
import { authClient } from '@rabbit/design-system/lib/auth-client'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function success() {
  const session = await authClient.getSession()

  if (!session?.data?.user) {
    redirect('/')
  }

  await syncStripeDataToKV(session.data.user.id)
  return <Success />
}
