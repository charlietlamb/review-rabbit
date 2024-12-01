'use client'

import { ProviderData } from '@ff/design-system/lib/providers'
import { DashboardConnectTable } from '../dashboard-connect-table'
import { Connect } from '@ff/database/schema/connects'
import { DashboardConnectProviderContext } from './dashboard-connect-provider-context'
import { toast } from 'sonner'
import { useEffect } from 'react'

export default function DashboardConnectProvider({
  provider,
  connects,
  status,
}: {
  provider: ProviderData
  connects: Connect[]
  status?: 'success' | 'error' | 'already-connected' | undefined
}) {
  useEffect(() => {
    if (!status) return
    if (status === 'success') {
      toast.success(`Successfully connected to ${provider.name}!`, {
        description: 'You can now start sharing your content.',
      })
    } else if (status === 'error') {
      toast.error(`Failed to connect to ${provider.name}`, {
        description: 'Please try again.',
      })
    } else if (status === 'already-connected') {
      toast.info(`You are already connected to ${provider.name}`, {
        description: 'You can continue sharing content as usual.',
      })
    }
  }, [status])
  return (
    <DashboardConnectProviderContext.Provider value={{ provider, connects }}>
      <DashboardConnectTable />
    </DashboardConnectProviderContext.Provider>
  )
}
