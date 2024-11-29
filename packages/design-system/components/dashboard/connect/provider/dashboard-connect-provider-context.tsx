import { createContext, useContext } from 'react'
import type { DashboardConnectProviderContext as DashboardConnectProviderContextType } from './dashboard-connect-provider-types'

export const DashboardConnectProviderContext = createContext<
  DashboardConnectProviderContextType | undefined
>(undefined)

export function useDashboardConnectProviderContext() {
  const context = useContext(DashboardConnectProviderContext)
  if (!context) {
    throw new Error(
      'useDashboardConnectProviderContext must be used within a DashboardConnectProviderContext'
    )
  }
  return context
}
