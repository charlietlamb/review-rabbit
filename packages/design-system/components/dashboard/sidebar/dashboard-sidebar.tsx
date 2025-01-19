'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
} from '@rabbit/design-system/components/ui/sidebar'
import {
  dashboardSidebarItems,
  dashboardSidebarItemsTop,
  dashboardSidebarItemsBottom,
  DashboardSidebarItem,
} from './data/dashboard-sidebar-items'
import DashboardSidebarMenuItem from './dashboard-sidebar-menu'
import DashboardSidebarFooter from './footer/dashboard-sidebar-footer'
import { useSidebar } from '@rabbit/design-system/components/ui/sidebar'
import { cn } from '@rabbit/design-system/lib/utils'

export default function DashboardSidebar() {
  const { open } = useSidebar()
  return (
    <Sidebar collapsible="icon" className="border-none border-t">
      <SidebarContent className={cn('py-2 md:py-0', open && 'px-4')}>
        <SidebarMenu>
          <SidebarGroupLabel className={cn(!open && 'hidden')}>
            Home
          </SidebarGroupLabel>
          {dashboardSidebarItemsTop.map((item: DashboardSidebarItem) => (
            <DashboardSidebarMenuItem key={item.title} item={item} />
          ))}
          <SidebarGroupLabel className={cn(!open && 'hidden')}>
            Manage
          </SidebarGroupLabel>
          {dashboardSidebarItems.map((item) => (
            <DashboardSidebarMenuItem key={item.title} item={item} />
          ))}
          <SidebarGroupLabel className={cn(!open && 'hidden')}>
            Create
          </SidebarGroupLabel>
          {dashboardSidebarItemsBottom.map((item) => (
            <DashboardSidebarMenuItem key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <DashboardSidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
