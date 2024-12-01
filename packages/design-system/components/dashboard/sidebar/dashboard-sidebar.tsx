import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarRail,
} from '@ff/design-system/components/ui/sidebar'
import { dashboardSidebarItems } from './data/dashboard-sidebar-items'
import DashboardSidebarMenuItem from './dashboard-sidebar-menu'
import DashboardSidebarFooter from './footer/dashboard-sidebar-footer'
import DashboardSidebarHeader from './header/dashboard-sidebar-header'

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="font-heading border-none">
      <DashboardSidebarHeader />
      <SidebarContent>
        <SidebarMenu>
          {dashboardSidebarItems.map((item) => (
            <DashboardSidebarMenuItem key={item.title} item={item} />
          ))}
          {/* <DashboardSidebarSettings /> */}
        </SidebarMenu>
      </SidebarContent>
      <DashboardSidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
