'use client'

import DashboardConnectProviders from './providers/dashboard-connect-providers'
import DashboardConnectFooter from './footer/dashboard-connect-footer'
import DashboardContentHeader from '../header/dashboard-content-header'

export default function DashboardConnect() {
  return (
    <div className="flex flex-col divide-y flex-grow overflow-hidden">
      <DashboardContentHeader
        title="Connect your accounts"
        subtitle="Connect your accounts to start creating posts."
      />
      <DashboardConnectProviders />
      <DashboardConnectFooter />
    </div>
  )
}
