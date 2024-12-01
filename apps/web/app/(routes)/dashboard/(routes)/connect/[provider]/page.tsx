import { redirect } from 'next/navigation'
import DashboardConnectProvider from '@ff/design-system/components/dashboard/connect/provider/dashboard-connect-provider'
import { providerDataById } from '@ff/design-system/lib/providers'
import { getProviderConnects } from '@ff/design-system/actions/connect/get-provider-connects'

export default async function page({
  params,
  searchParams,
}: {
  params: { provider: string }
  searchParams: { status?: string }
}) {
  //await is needed here
  const { provider: providerId } = await params
  const { status } = await searchParams
  const provider = providerDataById[providerId]
  const connects = await getProviderConnects(providerId)
  if (!provider) redirect('/dashboard/connect')

  return (
    <DashboardConnectProvider
      provider={provider}
      connects={connects}
      status={status as 'success' | 'error' | 'already-connected' | undefined}
    />
  )
}
