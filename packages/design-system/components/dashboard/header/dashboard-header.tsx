import DashboardBreadcrumb from '../breadcrumb/dashboard-breadcrumb'
import DashboardSidebarToggle from '../sidebar/toggle/dashboard-sidebar-toggle'
import DashboardHeaderActions from './dashboard-header-actions'

export default function DashboardHeader() {
  return (
    <div className="md:h-16 h-10 border-b flex items-center gap-2 bg-background rounded-tl-lg">
      <DashboardSidebarToggle />
      <DashboardBreadcrumb />
      <DashboardHeaderActions />
    </div>
  )
}
