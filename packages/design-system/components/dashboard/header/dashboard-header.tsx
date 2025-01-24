import { Slash } from 'lucide-react'
import DashboardHeaderBusiness from './dashboard-header-business'
import DashboardHeaderLocation from './dashboard-header-location'
import DashboardHeaderActions from './dashboard-header-actions'

export default function DashboardHeader() {
  return (
    <header className="h-16 flex items-center p-2 gap-2 group/header justify-between">
      <div className="flex items-center gap-2">
        <DashboardHeaderBusiness />
        <Slash className="rotate-[-30deg] text-muted-foreground/50" />
        <DashboardHeaderLocation />
      </div>
      <DashboardHeaderActions />
    </header>
  )
}
