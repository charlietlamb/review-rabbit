import { Success } from '@rabbit/design-system/components/site/success/success'
import { syncStripeDataToKV } from '@rabbit/stripe/lib/sync-stripe-data-to-kv'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@rabbit/auth'
import { getKv } from '@rabbit/kv'

export const dynamic = 'force-dynamic'

export default async function success({
  searchParams,
}: {
  searchParams: { plan: string }
}) {
  const { plan } = await searchParams
  const sessionResponse = await auth.api.getSession({
    headers: await headers(),
  })

  if (!sessionResponse?.user) {
    redirect('/')
  }

  const customerId = await kv.get(`stripe:user:${sessionResponse.user.id}`)

  if (!customerId) {
    redirect('/')
  }

  await syncStripeDataToKV(customerId as string)
  return <Success plan={plan} />
}
