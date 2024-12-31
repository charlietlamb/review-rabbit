'use client'

import { DashboardSidebarItem } from './data/dashboard-sidebar-items'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@rabbit/design-system/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@rabbit/design-system/lib/utils'

export default function DashboardSidebarMenuItem({
  item,
}: {
  item: DashboardSidebarItem
}) {
  const pathname = usePathname()
  const isActive = item.match.some((match) => pathname.includes(match))
  const { open, setOpenMobile } = useSidebar()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={item.href}
          className={cn(
            'mx-auto py-1 h-auto flex items-center text-muted-foreground',
            isActive && 'text-foreground'
          )}
          onClick={() => setOpenMobile(false)}
        >
          {item.icon}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
