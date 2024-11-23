'use client'

import DashboardTitle from '../title/dashboard-title'
import { DashboardConnectTable } from './dashboard-connect-table'

export default function DashboardConnect() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardTitle title="Connect" description="Connect your accounts" />
      <DashboardConnectTable />
    </div>
  )
}
