import DashboardBreadcrumb from '../breadcrumb/dashboard-breadcrumb'
import DashboardSidebarToggle from '../sidebar/toggle/dashboard-sidebar-toggle'

export default function DashboardHeader() {
  return (
    <div className="h-10 border-b flex items-center gap-2">
      <DashboardSidebarToggle />
      <DashboardBreadcrumb />
    </div>
  )
}
