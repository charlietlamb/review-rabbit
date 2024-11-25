'use client'

import DashboardTitle from '../title/dashboard-title'
import DashboardConnectProviders from './providers/dashboard-connect-providers'

export default function DashboardConnect() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardTitle title="Connect" description="Connect your accounts" />
      <DashboardConnectProviders />
    </div>
  )
}
