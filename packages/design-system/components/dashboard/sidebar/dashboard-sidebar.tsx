import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarRail,
  SidebarSeparator,
} from '@remio/design-system/components/ui/sidebar'
import {
  dashboardSidebarItems,
  dashboardSidebarItemsTop,
} from './data/dashboard-sidebar-items'
import DashboardSidebarMenuItem from './dashboard-sidebar-menu'
import DashboardSidebarFooter from './footer/dashboard-sidebar-footer'
import DashboardSidebarHeader from './header/dashboard-sidebar-header'

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="font-heading border-none">
      <DashboardSidebarHeader />
      <SidebarContent>
        <SidebarMenu>
          {dashboardSidebarItemsTop.map((item) => (
            <DashboardSidebarMenuItem key={item.title} item={item} />
          ))}
          <SidebarSeparator className="my-2" />
          {dashboardSidebarItems.map((item) => (
            <DashboardSidebarMenuItem key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <DashboardSidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
