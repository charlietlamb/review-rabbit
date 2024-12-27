import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
} from '@burse/design-system/components/ui/sidebar'
import {
  dashboardSidebarItems,
  dashboardSidebarItemsTop,
} from './data/dashboard-sidebar-items'
import DashboardSidebarMenuItem from './dashboard-sidebar-menu'
import DashboardSidebarFooter from './footer/dashboard-sidebar-footer'

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          {dashboardSidebarItemsTop.map((item) => (
            <DashboardSidebarMenuItem key={item.title} item={item} />
          ))}
          <SidebarGroupLabel>More</SidebarGroupLabel>
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
