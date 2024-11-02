import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ChevronRight, Settings } from 'lucide-react'
import { getIconWithClassName } from './functions/getIconWithClassName'

const item = {
  title: 'Settings',
  icon: <Settings />,
  isActive: false,
  items: [
    {
      title: 'Account',
      url: '/dashboard/settings/account',
    },
  ],
}
export default function DashboardSidebarSettings() {
  const iconWithClassName = getIconWithClassName(item.icon, 'min-w-4 min-h-4')
  return (
    <Collapsible
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible list-none"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {iconWithClassName}
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
