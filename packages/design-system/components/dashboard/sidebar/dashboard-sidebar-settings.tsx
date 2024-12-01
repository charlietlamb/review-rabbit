'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ff/design-system/components/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@ff/design-system/components/ui/sidebar'
import { cn } from '@ff/design-system/lib/utils'
import { ChevronRight, Settings } from 'lucide-react'

const item = {
  title: 'Settings',
  icon: <Settings className="min-w-4 min-h-4" />,
  isActive: false,
  items: [
    {
      title: 'Account',
      url: '/dashboard/settings/account',
    },
  ],
}
export default function DashboardSidebarSettings() {
  const { open } = useSidebar()
  return (
    <Collapsible
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible list-none"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className={cn(!open, 'flex justify-center')}
          >
            {item.icon}
            <span className="text-base">{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
