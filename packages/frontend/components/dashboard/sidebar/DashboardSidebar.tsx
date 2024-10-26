import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarRail,
} from '@/components/ui/sidebar'
import { dashboardSidebarItems } from './data/dashboardSidebarItems'
import DashboardSidebarMenuItem from './DashboardSidebarMenuItem'
import DashboardSidebarFooter from './footer/DashboardSidebarFooter'
import DashboardSidebarHeader from './header/DashboardSidebarHeader'
import DashboardSidebarSettings from './DashboardSidebarSettings'

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="font-heading">
      <DashboardSidebarHeader />
      <SidebarContent>
        <SidebarMenu>
          {dashboardSidebarItems.map((item) => (
            <DashboardSidebarMenuItem key={item.title} item={item} />
          ))}
        </SidebarMenu>
        <DashboardSidebarSettings />
      </SidebarContent>
      <DashboardSidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
