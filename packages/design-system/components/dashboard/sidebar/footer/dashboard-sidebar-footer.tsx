'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@rabbit/design-system/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@rabbit/design-system/components/ui/dropdown-menu'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@rabbit/design-system/components/ui/sidebar'
import useUser from '@rabbit/design-system/hooks/use-user'
import { ChevronsUpDown } from 'lucide-react'
import DashboardSidebarFooterMenu from './dashboard-sidebar-footer-menu'

export default function DashboardSidebarFooter() {
  const user = useUser()
  if (!user) return null
  return (
    <SidebarFooter className="border-t bg-gradient-to-b from-background via-background to-muted/20">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="group/button data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-muted/80 transition-all duration-300"
              >
                <Avatar className="h-8 w-8 rounded-lg ring-2 ring-border/40 ring-offset-1 ring-offset-background transition-all duration-300 group-hover/button:ring-primary/30">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={user?.name ?? ''}
                    className="object-cover mx-auto my-auto"
                  />
                  <AvatarFallback className="rounded-lg bg-primary/5 text-primary font-medium">
                    {user?.name?.[0] ?? 'CN'}
                    {user?.name?.split(' ')[1]?.[0] ?? ''}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold group-hover/button:text-primary transition-colors duration-300">
                    {user?.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground group-hover/button:text-primary/80 transition-colors duration-300">
                    {user?.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-hover/button:text-primary/80 transition-colors duration-300" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DashboardSidebarFooterMenu />
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
